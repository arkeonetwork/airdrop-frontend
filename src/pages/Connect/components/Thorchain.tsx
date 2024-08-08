import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, Input } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { AssetValue, Chain, createSwapKit } from '@swapkit/sdk'
import { xdefiWallet } from '@swapkit/wallet-xdefi'
import { ConnectedAccount } from './ConnectedAccount'
import axios from 'axios'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET

export const Thorchain: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [enterHash, setEnterHash] = useState(false)
  const [hashValue, setHashValue] = React.useState('')
  const prefix = isTestnet ? 'tarkeo' : 'arkeo'

  const [
    arkeoAccountDerivedFromThorchain,
    setArkeoAccountDerivedFromThorchain,
  ] = useState<string>('')
  const client = createSwapKit()
  client.extend({ wallets: [xdefiWallet] })

  const connectChains = [Chain.THORChain]
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
      await client.connectXDEFI(connectChains)
    } catch (e) {
      setErrorMessage('No wallet found, please install xDefi')
      return
    }
    if (enterHash) {
      setTxHash()
    } else if (thorDelegateTx) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else if (thorAccount) {
      // dispatch({
      //   type: 'SET_THORCHAIN_DELEGATE_TX',
      //   payload:
      //     'FA2768AEB52AE0A378372B48B10C5B374B25E8B2005C702AAD441B813ED2F174',
      // }) // for testing

      const wallet = client.getWallet(Chain.THORChain)
      const walletAddress = client.getAddress(Chain.THORChain)

      if (walletAddress !== thorAccount) {
        setErrorMessage('Wallet address does not match')
        return
      }
      const assetValue = AssetValue.fromStringSync('THOR.RUNE')
      const tx = await wallet.deposit({
        assetValue,
        memo: `delegate:arkeo:${arkeoAccount}`,
      })
      console.log({ tx })
      dispatch({ type: 'SET_THORCHAIN_DELEGATE_TX', payload: tx })
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      const address = client.getAddress(Chain.THORChain)
      dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })
    }
  }

  const setTxHash = async () => {
    try {
      const apiUrl = `https://thornode.ninerealms.com/thorchain/tx/${hashValue}`
      const response = await axios.get(apiUrl)
      const data = response.data
      const thorAccount = data?.observed_tx?.tx?.from_address
      if (!thorAccount) {
        throw new Error('Invalid Tx Hash')
      }

      const memo = data?.observed_tx?.tx?.memo
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
  const skipText = !thorAccount || thorAmountClaim === 0
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
            onClick={broadcastTx}
          >
            {buttonText}
          </Button>
          {!thorDelegateTx && (
            <Button onClick={skipClick} variant="outline" mt={2}>
              {skipText}
            </Button>
          )}
        </Box>
      </Flex>
    </>
  )
}
