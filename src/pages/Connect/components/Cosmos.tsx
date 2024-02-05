import React, { useEffect } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'

type Props = {}

export const Cosmos: React.FC<Props> = ({}) => {
  const {
    state: { step, cosmosAccount },
    dispatch,
  } = useConnect()
  const { username, address, disconnect, openView, isWalletConnected } =
    useChain('cosmoshub')

  const { claimRecord, error } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    dispatch({ type: 'SET_COSMOS_ACCOUNT', payload: address })
  }, [address])

  useEffect(() => {
    if (!claimRecord) return
    if (isWalletConnected)
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
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
