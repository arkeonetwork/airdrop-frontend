import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, Input } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { ConnectedAccount } from './ConnectedAccount'
import axios from 'axios'
import { useChain } from '@cosmos-kit/react'
import { coins } from '@cosmjs/proto-signing'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET

export const Thorchain: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [enterHash, setEnterHash] = useState(false)
  const [hashValue, setHashValue] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)

  const prefix = isTestnet ? 'tarkeo' : 'arkeo'

  const { address } =
    useChain('thorchain')

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
        amountClaim: thorAmountClaim,
      },
    },
    dispatch,
  } = useConnect()

  const { claimRecord } = useGetClaim({
    address: arkeoAccountDerivedFromThorchain ?? '',
  })

  const { getSigningStargateClient } = useChain('thorchain')

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
        setTxHash()
      } else if (thorDelegateTx) {
        dispatch({ type: 'SET_STEP', payload: step + 1 })
      } else if (thorAccount) {
        console.log('thorAccount', thorAccount)
        const signingClient = await getSigningStargateClient()
        if (!signingClient) {
          console.log('No signing client found')
          throw new Error('No signing client found')
        }
        console.log({ signingClient })

        const amount = coins('1', 'rune') // 0.00000001 RUNE
        const fee = {
          amount: coins('2000', 'rune'),
          gas: '200000',
        }

        const tx = await signingClient.sendTokens(
          thorAccount,
          thorAccount,
          amount,
          fee,
          `delegate:arkeo:${arkeoAccount}`,
        )

        console.log('Transaction hash:', tx.transactionHash)
        dispatch({
          type: 'SET_THORCHAIN_DELEGATE_TX',
          payload: tx.transactionHash,
        })
        dispatch({ type: 'SET_STEP', payload: step + 1 })
      } else {
        dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Transaction failed',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const setTxHash = async () => {
    try {
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
      const thorAccount = inbound[0].address
      console.log({ thorAccount })
      if (!thorAccount) {
        throw new Error('Invalid Tx Hash')
      }

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
        throw new Error('Invalid Tx Memo')
      }

      if (!thorAccount) {
        throw new Error('Invalid Tx Hash')
      }
      dispatch({ type: 'SET_THORCHAIN_DELEGATE_TX', payload: hashValue })
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } catch (e) {
      setErrorMessage('Invalid Transaction')
    }
  }

  const skipClick = async () => {
    setErrorMessage('')
    if (!thorAccount || thorAmountClaim === 0) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
      dispatch({ type: 'RESET_THOR' })
    } else if (!enterHash) {
      setEnterHash(true)
    } else {
      setEnterHash(false)
    }
  }

  const renderWallet = () => {
    if (thorAccount) {
      if (!enterHash) {
        return (
          <Box w="100%">
            <ConnectedAccount
              width="100%"
              my={0}
              amount={claimRecord?.amountClaim ?? '0'}
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
      } else {
        return (
          <>
            <Text>
              Enter your Thorchain TX hash that contains your delegation
              transaction. The memo should be in the format of <br />
              <b>delegate:arkeo:{'{txhash}'}</b>
            </Text>
            <Input
              value={hashValue}
              onChange={(event) => setHashValue(event.target.value)}
              placeholder="Enter Your Transaction Hash"
            />
          </>
        )
      }
    }
    return <Image w="150px" h="150px" src={CosmosLogo} />
  }

  const buttonText =
    thorDelegateTx || enterHash
      ? 'Next'
      : thorAccount
        ? 'Broadcast Transaction'
        : 'Connect Wallet'
  const skipText =
    !thorAccount || thorAmountClaim === 0
      ? 'Skip'
      : !enterHash
        ? 'Enter Tx Hash'
        : 'Back'
  return (
    <>
      <Flex
        flexDir="column"
        flex="1 0 0"
        gap="42px"
        textAlign="center"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text fontWeight={900}>Connect Thorchain Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Thorchain wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}

        <Text my="8px" height="16px" color="red.500">
          {errorMessage}
        </Text>
        <Box w="100%">
          <Button
            isDisabled={!!thorAccount && thorAmountClaim === 0}
            isLoading={isLoading}
            onClick={broadcastTx}
          >
            {buttonText}
          </Button>
          {!thorDelegateTx && !isLoading && (
            <Button onClick={skipClick} variant="outline" mt={2}>
              {skipText}
            </Button>
          )}
        </Box>
      </Flex>
    </>
  )
}
