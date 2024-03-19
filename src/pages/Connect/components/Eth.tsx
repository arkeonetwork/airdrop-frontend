import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import {
  useSignTypedData,
  useDisconnect,
  useAccount,
  ConnectorData,
} from 'wagmi'
import { useGetClaim } from '@hooks/useGetClaim'

type Props = {}

export const Eth: React.FC<Props> = ({}) => {
  const {
    state: {
      step,
      ethInfo: { account: ethAccount, signature: ethSignature },
      arkeoInfo: { account: arkeoAccount },
    },
    dispatch,
  } = useConnect()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { open } = useWeb3Modal()
  const { address, connector: activeConnector } = useAccount()
  const { disconnect } = useDisconnect()
  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })

  const {
    data,
    isError,
    isLoading,
    isSuccess,
    signTypedData,
    status,
    reset,
    error,
  } = useSignTypedData()

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        dispatch({ type: 'SET_ETH_ACCOUNT', payload: account })
        dispatch({ type: 'SET_ETH_SIGNATURE' })
        reset()
      } else if (chain) {
        console.log('new chain', chain)
      }
    }

    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate)
    }

    return () => {
      activeConnector?.off('change', handleConnectorUpdate)
    }
  }, [activeConnector])

  useEffect(() => {
    dispatch({ type: 'SET_ETH_SIGNATURE', payload: data })
  }, [data])

  useEffect(() => {
    if (error?.name.includes('ChainMismatchError')) {
      setErrorMessage('Please switch to Ethereum network')
    }
  }, [error])

  useEffect(() => {
    if (!claimRecord) return
    if (status === 'success') {
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
      dispatch({ type: 'SET_ETH_AMOUNT', payload: claimRecord.amountClaim })
    }
  }, [status, claimRecord])

  useEffect(() => {
    if (address) {
      dispatch({ type: 'SET_ETH_ACCOUNT', payload: address })
    }
  }, [address])

  const handleClick = () => {
    setErrorMessage('')
    if (ethAccount && ethSignature) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      if (address && arkeoAccount) {
        signTypedData({
          types: {
            Claim: [
              { name: 'address', type: 'address' },
              { name: 'arkeoAddress', type: 'string' },
              { name: 'amount', type: 'string' },
            ],
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'version', type: 'string' },
            ],
          },
          primaryType: 'Claim',
          domain: {
            name: 'ArkdropClaim' as any,
            version: '1' as any,
            chainId: 1 as any,
          },
          message: {
            address,
            arkeoAddress: arkeoAccount,
            amount: claimRecord?.totalAmount,
          },
        })
      } else {
        open({ view: 'Connect' })
      }
    }
  }

  const skipClick = () => {
    dispatch({ type: 'SET_STEP', payload: step + 1 })
    dispatch({ type: 'RESET_ETH' })
  }

  const renderWallet = () => {
    console.log({ address })
    if (ethAccount) {
      return (
        <ConnectedAccount
          width="100%"
          amount={claimRecord?.amountClaim ?? '0'}
          account={ethAccount}
          disconnect={() => {
            disconnect()
            dispatch({ type: 'SUB_TOTAL_AMOUNTS', payload: claimRecord })
            dispatch({ type: 'RESET_ETH' })
            reset()
          }}
        />
      )
    }
    return <Image w="150px" h="150px" src={CosmosLogo} />
  }
  const buttonText =
    ethAccount && ethSignature
      ? 'Next'
      : address
        ? 'Sign With Wallet'
        : 'Connect Wallet'

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
          <Text fontWeight={900}>Connect ETH Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your ETH wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Text my="8px" height="16px" color="red.500">
          {errorMessage}
        </Text>
        <Box w="100%">
          <Button onClick={handleClick}>{buttonText}</Button>
          <Button onClick={skipClick} variant="outline" mt={2}>
            Skip
          </Button>
        </Box>
      </Flex>
    </>
  )
}
