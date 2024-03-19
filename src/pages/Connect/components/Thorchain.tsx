import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { AssetValue, Chain, createSwapKit } from '@swapkit/sdk'
import { xdefiWallet } from '@swapkit/wallet-xdefi'
import { ConnectedAccount } from './ConnectedAccount'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC

export const Thorchain: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
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
      thorInfo: { account: thorAccount },
    },
    dispatch,
  } = useConnect()

  const { claimRecord } = useGetClaim({
    address: arkeoAccountDerivedFromThorchain ?? '',
  })

  useEffect(() => {
    if (!thorAccount) return
    const prefix = isTestnet ? 'tarkeo' : 'arkeo'
    const words = bech32.decode(thorAccount).words
    const arkeoAccount = bech32.encode(prefix, words)
    setArkeoAccountDerivedFromThorchain(arkeoAccount)
  }, [thorAccount])

  useEffect(() => {
    if (!claimRecord) return
    if (thorAccount) {
      dispatch({
        type: 'SET_THORCHAIN_AMOUNT',
        payload: claimRecord.amountClaim,
      })
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
    }
  }, [thorAccount, claimRecord])

  const handleClick = async () => {
    try {
      await client.connectXDEFI(connectChains)
    } catch (e) {
      setErrorMessage('No wallet found, please install xDefi')
      return
    }
    if (thorAccount) {
      const wallet = client.getWallet(Chain.THORChain)
      const assetValue = AssetValue.fromStringSync('THOR.RUNE')
      console.log({ assetValue, wallet })
      const message = await wallet.deposit({
        // recipient: client.getAddress(Chain.THORChain),
        assetValue,
        memo: `delegate:arkeo:${arkeoAccount}`,
      })
      console.log({ message })
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      const address = client.getAddress(Chain.THORChain)
      dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })
    }
  }

  const skipClick = async () => {
    dispatch({ type: 'SET_STEP', payload: step + 1 })
    dispatch({ type: 'RESET_THOR' })
  }

  const renderWallet = () => {
    if (thorAccount) {
      return (
        <ConnectedAccount
          width="100%"
          my={0}
          amount={claimRecord?.amountClaim ?? '0'}
          account={thorAccount}
          name={'Thorchain'}
          disconnect={() => {
            dispatch({ type: 'RESET_THOR' })
            dispatch({ type: 'SUB_TOTAL_AMOUNTS', payload: claimRecord })
          }}
        />
      )
    }
    return <Image w="150px" h="150px" src={CosmosLogo} />
  }

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
          <Button onClick={handleClick}>
            {thorAccount ? 'Broadcast Transaction' : 'Connect Wallet'}
          </Button>{' '}
          <Button onClick={skipClick} variant="outline" mt={2}>
            Skip
          </Button>
        </Box>
      </Flex>
    </>
  )
}
