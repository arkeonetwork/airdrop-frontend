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
    arkeoAccountDerivedfromThorchain,
    setArkeoAccountDerivedfromThorchain,
  ] = useState<string>('')
  const client = createSwapKit()
  client.extend({ wallets: [xdefiWallet] })

  const connectChains = [Chain.THORChain]
  const chainArkeo = isTestnet ? 'arkeonetworktestnet' : 'arkeonetwork'
  const {
    state: {
      step,
      thorchainInfo: { account: thorchainAccount },
    },
    dispatch,
  } = useConnect()

  const { claimRecord } = useGetClaim({
    address: arkeoAccountDerivedfromThorchain ?? '',
  })

  useEffect(() => {
    if (!thorchainAccount) return
    const prefix = isTestnet ? 'tarkeo' : 'arkeo'
    const words = bech32.decode(thorchainAccount).words
    const arkeoAccount = bech32.encode(prefix, words)
    setArkeoAccountDerivedfromThorchain(arkeoAccount)
  }, [thorchainAccount])

  useEffect(() => {
    if (!claimRecord) return
    if (thorchainAccount) {
      dispatch({
        type: 'SET_THORCHAIN_AMOUNT',
        payload: claimRecord.amountClaim,
      })
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
    }
  }, [thorchainAccount, claimRecord])
  console.log({ claimRecord })

  const handleClick = async () => {
    if (thorchainAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      await client.connectXDEFI(connectChains)
      const address = client.getAddress(Chain.THORChain)
      dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })

      if (address) {
      } else {
        setErrorMessage('No wallet found, please install xDefi')
      }
      //     const wallet = client.getWallet(Chain.THORChain)
      //   const assetValue = AssetValue.fromStringSync('THOR.RUNE')
      //   console.log({ assetValue })
      //   const message = await wallet.transfer({
      //     recipient: client.getAddress(Chain.THORChain),
      //     assetValue,
      //     memo: `delegate:arkeo:${arkeoAccount}`,
      //   })
      //   console.log({ message })
    }
  }

  const renderWallet = () => {
    if (thorchainAccount) {
      return (
        <ConnectedAccount
          width="100%"
          my={0}
          amount={claimRecord?.amountClaim ?? '0'}
          account={thorchainAccount}
          name={'Thorchain'}
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
        <Button onClick={handleClick}>
          {thorchainAccount ? 'Next' : 'Connect Wallet'}
        </Button>
      </Flex>
    </>
  )
}
