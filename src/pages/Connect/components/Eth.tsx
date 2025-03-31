import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import EthLogo from '@assets/eth-logo-diamond.svg'
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
import { motion, AnimatePresence } from 'framer-motion'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionImage = motion(Image)
const MotionButton = motion(Button)

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
  const [isLoading, setIsLoading] = useState(false)

  const { open } = useWeb3Modal()
  const { address, connector: activeConnector } = useAccount()
  const { disconnect } = useDisconnect()
  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })
  const { data, signTypedData, status, reset, error } = useSignTypedData()
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setIsLoading(false)
    }
  }, [status])

  useEffect(() => {
    const handleConnectorUpdate = ({ account }: ConnectorData) => {
      if (account) {
        dispatch({ type: 'SET_ETH_ACCOUNT', payload: account })
        dispatch({ type: 'SET_ETH_SIGNATURE' })
        reset()
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
    if (data) {
      dispatch({ type: 'SET_ETH_SIGNATURE', payload: data })
    }
  }, [data])

  useEffect(() => {
    if (error?.name.includes('ChainMismatchError')) {
      setErrorMessage('Please switch to Ethereum network')
    } else if (error?.name.includes('UserRejectedRequestError')) {
      setErrorMessage('User rejected the request')
    } else if (error?.name) {
      setErrorMessage('Signing failed')
    }
  }, [error])

  useEffect(() => {
    if (!claimRecord) return
    if (status === 'success') {
      dispatch({ type: 'SET_ETH_AMOUNT', payload: claimRecord })
    }
  }, [status, claimRecord])

  useEffect(() => {
    if (address) {
      dispatch({ type: 'SET_ETH_ACCOUNT', payload: address })
    }
  }, [address])

  const handleClick = async () => {
    setErrorMessage('')
    if (ethAccount && ethSignature) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      if (address && arkeoAccount) {
        setIsLoading(true)
        signTypedData({
          types: {
            Claim: [
              { name: 'address', type: 'address' },
              { name: 'arkeoAddress', type: 'string' },
              { name: 'amount', type: 'string' },
            ],
          },
          primaryType: 'Claim',
          domain: {
            name: 'ArkdropClaim',
            version: '1',
            chainId: 1,
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

  const buttonText =
    ethAccount && ethSignature
      ? 'Next'
      : address
        ? 'Sign With Wallet'
        : 'Connect Wallet'
  const canSignTx = !address || (address && claimRecord?.claimableAmount > 0)

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
          <Text fontWeight={900}>Connect ETH Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your ETH wallet to check for eligibility.
          </Text>
        </MotionBox>

        <MotionFlex
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          w="100%"
          justifyContent="center"
        >
          {ethAccount ? (
            <ConnectedAccount
              width="100%"
              my={0}
              amount={claimRecord?.claimableAmount ?? '0'}
              account={ethAccount}
              loading={isLoading}
              disconnect={() => {
                disconnect()
                dispatch({ type: 'RESET_ETH' })
                reset()
              }}
            />
          ) : (
            <MotionImage
              w="150px"
              h="150px"
              src={EthLogo}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            />
          )}
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
          <MotionButton
            isDisabled={!canSignTx}
            isLoading={isLoading}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </MotionButton>
          <MotionButton
            onClick={skipClick}
            variant="outline"
            mt={2}
            whileTap={{ scale: 0.95 }}
          >
            Skip
          </MotionButton>
        </MotionBox>
      </MotionFlex>
    </AnimatePresence>
  )
}
