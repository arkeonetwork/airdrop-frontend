import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, useRadioGroup } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'

type Props = {}

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC

export const Cosmos: React.FC<Props> = () => {
  const chainArkeo = isTestnet ? 'arkeonetworktestnet' : 'arkeonetwork'
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    state: {
      step,
      arkeoInfo: { account: arkeoAccount },
    },
    dispatch,
  } = useConnect()

  const { chain, username, address, disconnect, openView, isWalletConnected } =
    useChain('localarkeo')
  console.log({ isWalletConnected, arkeoAccount })

  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    if (!address) return
    dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: address })
  }, [address])

  useEffect(() => {
    if (!claimRecord) return
    if (isWalletConnected) {
      console.log("OK")
      dispatch({ type: 'SET_ARKEO_AMOUNT', payload: claimRecord.amountClaim })
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
    }
  }, [isWalletConnected, claimRecord])

  const handleClick = () => {
    if (arkeoAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      openView()
    }
  }

  const renderWallet = () => {
    if (arkeoAccount) {
      return (
        <ConnectedAccount
          width="100%"
          my={0}
          amount={claimRecord?.amountClaim ?? '0'}
          account={arkeoAccount}
          name={username}
          disconnect={() => {
            dispatch({ type: 'RESET_ARKEO' })
            dispatch({ type: 'SUB_TOTAL_AMOUNTS', payload: claimRecord })
            disconnect?.()
          }}
        />
      )
    }
    return <Image w="180px" h="180px" src={CosmosLogo} />
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
          <Text fontWeight={900}>Connect Arkeo Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Arkeo wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Box width="100%">
          <Text my="8px" height="16px" color="red.500">
            {errorMessage}
          </Text>

          <Button onClick={handleClick}>
            {arkeoAccount ? 'Next' : 'Connect Wallet'}
          </Button>
        </Box>
      </Flex>
    </>
  )
}
