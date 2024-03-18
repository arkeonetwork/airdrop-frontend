import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, useRadioGroup } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'
import { bech32 } from 'bech32'
import { RadioCard } from '@components/RadioCard'
import { Client } from '../../../../ts-client'
import { Chain, createSwapKit } from '@swapkit/sdk'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC
const client = createSwapKit();
const connectChains = [Chain.THORChain]

export const Cosmos: React.FC<Props> = () => {
  const chainArkeo = isTestnet ? 'arkeonetworktestnet' : 'arkeonetwork'
  const {
    state: {
      step,
      cosmosInfo: { account: cosmosAccount },
    },
    dispatch,
  } = useConnect()

  const { chain, username, address, disconnect, openView, isWalletConnected } =
    useChain('localarkeo')


  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })


  useEffect(() => {
    if (!address) return
    const prefix = isTestnet ? 'tarkeo' : 'arkeo'
    const words = bech32.decode(address).words
    const arkeoAccount = bech32.encode(prefix, words)
    console.log("Cosmos?", address)
    console.log("arkeoAccount?", arkeoAccount)
    dispatch({ type: 'SET_COSMOS_ACCOUNT', payload: address })
    dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: arkeoAccount })
  }, [address])

  useEffect(() => {
    if (!claimRecord) return
    if (isWalletConnected) {
      dispatch({ type: 'SET_COSMOS_AMOUNT', payload: claimRecord.amountClaim })
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
    }
  }, [isWalletConnected, claimRecord])

  const handleClick = () => {
    if (cosmosAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      openView()
    }
  }

  const renderWallet = () => {
    if (cosmosAccount) {
      return (
        <ConnectedAccount
          width="100%"
          my={0}
          amount={claimRecord?.amountClaim ?? '0'}
          account={cosmosAccount}
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
          <Text fontWeight={900}>Connect Cosmos Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Cosmos wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>
          {cosmosAccount ? 'Next' : 'Connect Wallet'}
        </Button>
      </Flex>
    </>
  )
}
