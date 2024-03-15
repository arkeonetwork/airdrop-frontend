import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, useRadioGroup } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { Client } from '../../../../ts-client'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC


export const Thorchain: React.FC<Props> = () => {
  const chainArkeo = isTestnet ? 'arkeonetworktestnet' : 'arkeonetwork'
  const {
    state: {
      step,
      thorchainInfo: { account: thorchainAccount },
    },
    dispatch,
  } = useConnect()

  const { chain, username, address, disconnect, openView, isWalletConnected } =
    useChain('localarkeo')

  console.log({ chain, slip44: chain.slip44, address })

  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })


  useEffect(() => {
    if (!address) return
    const prefix = isTestnet ? 'tarkeo' : 'arkeo'
    const words = bech32.decode(address).words
    const arkeoAccount = bech32.encode(prefix, words)
    dispatch({ type: 'SET_THORCHAIN_ACCOUNT', payload: address })
    dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: arkeoAccount })
  }, [address])

  useEffect(() => {
    if (!claimRecord) return
    if (isWalletConnected) {
      dispatch({ type: 'SET_COSMOS_AMOUNT', payload: claimRecord.amountClaim })
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
    }
  }, [isWalletConnected, claimRecord])
  console.log({claimRecord})

  const testBip = async () => {
    const client = new Client({
      apiURL: arkeoEndpointRest,
      rpcURL: arkeoEndpointRpc,
      prefix: isTestnet ? 'tarkeo' : 'arkeo',
    })

    await client.useKeplr({
      rpc: arkeoEndpointRpc,
      rest: arkeoEndpointRest,
      bip44: {
        coinType: 931,
      },
      coinType: 931,
    })
   console.log("SIGNER", client.signer)
  }

  const handleClick = () => {
    testBip()
    if (thorchainAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      openView()
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
          name={username}
          disconnect={() => {
            dispatch({ type: 'SUB_TOTAL_AMOUNTS', payload: claimRecord })
            disconnect()
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
        <Button onClick={handleClick}>
          {thorchainAccount ? 'Next' : 'Connect Wallet'}
        </Button>
      </Flex>
    </>
  )
}
