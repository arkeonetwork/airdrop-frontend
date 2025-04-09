import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  Input,
  Tooltip,
  Icon,
} from '@chakra-ui/react'
import TCLogo from '@assets/thorchain-logo.svg'
import { useConnect } from '../ConnectContext'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { ConnectedAccount } from './ConnectedAccount'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { AssetValue, Chain, createSwapKit } from '@swapkit/sdk'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionImage = motion(Image)
const MotionButton = motion(Button)
const MotionIcon = motion(Icon)

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET === 'true'

export const Thorchain: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [enterHash, setEnterHash] = useState(false)
  const [hashValue, setHashValue] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const prefix = isTestnet ? 'tarkeo' : 'arkeo'

  const client = createSwapKit()

  const [
    arkeoAccountDerivedFromThorchain,
    setArkeoAccountDerivedFromThorchain,
  ] = useState<string>('')

  const {
    state: {
      step,
      arkeoInfo: { account: arkeoAccount },
      thorInfo: {
        account: thorAccount,
        delegateTx: thorDelegateTx,
        claimableAmount: thorAmountClaim,
      },
    },
    dispatch,
  } = useConnect()

  const { claimRecord } = useGetClaim({
    address: arkeoAccountDerivedFromThorchain ?? '',
  })

  useEffect(() => {
    if (!thorAccount) return
    const words = bech32.decode(thorAccount).words
    const arkeoAccount = bech32.encode(prefix, words)
    setArkeoAccountDerivedFromThorchain(arkeoAccount)
  }, [thorAccount])

  useEffect(() => {
    if (!claimRecord) return
    if (thorAccount) {
      dispatch({
        type: 'SET_THORCHAIN_AMOUNT',
        payload: claimRecord,
      })
    }
  }, [thorAccount, claimRecord])

  const broadcastTx = async () => {
    try {
      setErrorMessage('')
      setIsLoading(true)
      if (enterHash) {
        await setTxHash()
      } else if (thorDelegateTx) {
        dispatch({ type: 'SET_STEP', payload: step + 1 })
      } else if (thorAccount) {
        const assetValue = AssetValue.fromStringSync('THOR.RUNE', 0.00000001)
        await client.connectCtrl([Chain.THORChain])
        const tx = await client.transfer({
          assetValue,
          recipient: thorAccount,
          from: thorAccount,
          memo: `delegate:arkeo:${arkeoAccount}`,
        })
        await new Promise((resolve) => setTimeout(resolve, 1500)) // wait 1.5 second to let it mine

        dispatch({
          type: 'SET_THORCHAIN_DELEGATE_TX',
          payload: tx,
        })
        dispatch({ type: 'SET_STEP', payload: step + 1 })
      } else {
        await client.connectCtrl([Chain.THORChain])
        const address = client.getAddress(Chain.THORChain)
        dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })
      }
    } catch (error) {
      console.error(error)
      const errorMsg =
        error instanceof Error
          ? error.message.includes('insufficient funds')
            ? 'Insufficient funds'
            : error.message.includes('not_found')
              ? 'Ctrl wallet not found'
              : error.message
          : 'Transaction failed'

      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const setTxHash = async () => {
    try {
      setIsLoading(true)
      const apiUrl = `https://vanaheimex.com/actions?txid=${hashValue}`
      const response = await axios.get(apiUrl)
      const data = response.data
      const { actions } = data as any
      const {
        in: inbound,
        metadata: {
          send: { memo },
        },
      } = actions[0]
      const derivedThorAccount = inbound[0].address

      const split = memo.split(':')
      const delegate = split[0]
      const arkeo = split[1]
      const toAddress = split[2]
      const decodedToAddress = bech32.decode(toAddress)

      if (
        arkeo !== 'arkeo' &&
        delegate !== 'delegate' &&
        decodedToAddress.prefix !== prefix
      ) {
        console.error('Invalid Tx Memo')
        throw new Error('Invalid Tx Memo')
      }

      if (arkeoAccount !== toAddress) {
        console.error('Wrong Arkeo account in memo')
        throw new Error('Wrong Arkeo account in memo')
      }

      dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: derivedThorAccount })
      dispatch({ type: 'SET_THORCHAIN_DELEGATE_TX', payload: hashValue })
      setEnterHash(false)
    } catch (e) {
      console.error(e)
      setErrorMessage(e instanceof Error ? e.message : 'Invalid Transaction')
    } finally {
      // setIsLoading(false)
    }
  }

  const skipClick = async () => {
    setErrorMessage('')
    if (!enterHash && (!thorAccount || thorAmountClaim === 0)) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
      dispatch({ type: 'RESET_THOR' })
    } else {
      setEnterHash(false)
    }
  }

  const renderWallet = () => {
    if (enterHash) {
      return (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          width="80%"
        >
          <Text mb="26px">
            Enter your Thorchain TX hash that contains your delegation
            transaction. <br />
            <br />
            <b>Your memo should be:</b> <br />
            <Flex alignItems="center">
              <Text wordBreak="break-word" mr="10px">
                <b>delegate:arkeo:{arkeoAccount}</b>
              </Text>
              <MotionIcon
                cursor="pointer"
                color="blue.500"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `delegate:arkeo:${arkeoAccount}`,
                  )
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 6000)
                }}
                as={isCopied ? CheckIcon : CopyIcon}
                key={isCopied ? 'check' : 'copy'} 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
            </Flex>
            <br />
          </Text>
          <Input
            value={hashValue}
            onChange={(event) => setHashValue(event.target.value)}
            placeholder="Enter Your Transaction Hash"
          />
        </MotionBox>
      )
    } else if (thorAccount) {
      return (
        <Box w="100%">
          <ConnectedAccount
            width="100%"
            my={0}
            amount={claimRecord?.claimableAmount ?? '0'}
            account={thorAccount}
            name={'Thorchain'}
            loading={isLoading}
            disconnect={
              !thorDelegateTx
                ? () => {
                    dispatch({ type: 'RESET_THOR' })
                  }
                : undefined
            }
          />
        </Box>
      )
    }
    return (
      <MotionImage
        w="150px"
        h="150px"
        src={TCLogo}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, times: [0, 0.6, 1] }}
      />
    )
  }

  const buttonText =
    thorDelegateTx || enterHash
      ? 'Next'
      : thorAccount
        ? 'Broadcast Transaction'
        : 'Connect Wallet'
  const skipText = !enterHash ? 'Skip' : 'Back'
  return (
    <AnimatePresence>
      <MotionFlex
        flexDir="column"
        flex="1 0 0"
        gap="42px"
        textAlign="center"
        alignItems="center"
        justifyContent="space-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Text fontWeight={900}>Connect Thorchain Account</Text>
            <Tooltip
              label="Thorchain does not support signing arbitrary messages.  To verify your account on chain, you will need to broadcast a transaction using your Thorchain wallet."
              placement="top"
              bg="gray.200"
              hasArrow
            >
              <Flex
                ml={2}
                borderRadius="full"
                bg="gray.500"
                w="18px"
                h="18px"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
              >
                <Text color="white" fontWeight="bold" fontSize="12px">
                  ?
                </Text>
              </Flex>
            </Tooltip>
          </Flex>
          <Text fontWeight={500} color="grey.50">
            Connect your Thorchain wallet to check for eligibility.
          </Text>
        </MotionBox>

        <MotionFlex
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          width="100%"
          justifyContent="center"
        >
          {renderWallet()}
        </MotionFlex>

        <Text my="8px" height="16px" color="red.500">
          {errorMessage}
        </Text>

        <MotionBox
          w="100%"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!enterHash && (
            <Text
              onClick={() => setEnterHash(true)}
              m="18px"
              height="16px"
              color="white"
              textDecoration="underline"
              fontWeight="bold"
              cursor="pointer"
            >
              Enter Tx Hash
            </Text>
          )}
          <MotionButton
            isDisabled={!enterHash && !!thorAccount && thorAmountClaim === 0}
            isLoading={isLoading}
            onClick={broadcastTx}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </MotionButton>

          {!isLoading && (
            <MotionButton
              onClick={skipClick}
              isDisabled={!enterHash && !!thorAccount && thorAmountClaim > 0}
              variant="outline"
              mt={2}
              whileTap={{ scale: 0.95 }}
            >
              {skipText}
            </MotionButton>
          )}
        </MotionBox>
      </MotionFlex>
    </AnimatePresence>
  )
}
