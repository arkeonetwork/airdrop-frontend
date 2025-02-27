import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, useRadioGroup } from '@chakra-ui/react'
import ArkeoLogo from '@assets/arkeo-symbol-grey.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'
import { motion, AnimatePresence } from 'framer-motion'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionImage = motion(Image)
const MotionButton = motion(Button)

type Props = {}

export const Cosmos: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    state: {
      step,
      arkeoInfo: { account: arkeoAccount },
    },
    dispatch,
  } = useConnect()

  const { username, address, disconnect, openView, isWalletConnected } =
    useChain('arkeo')

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
      dispatch({ type: 'SET_ARKEO_AMOUNTS', payload: claimRecord })
    }
  }, [isWalletConnected, claimRecord])

  const handleClick = () => {
    if (arkeoAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      openView()
    }
  }

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
          <Text fontWeight={900}>Connect Arkeo Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Arkeo wallet to check for eligibility.
          </Text>
        </MotionBox>

        <MotionFlex
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          w="100%"
          justifyContent="center"
        >
          {arkeoAccount ? ( 
            <ConnectedAccount
              width="100%"
              my={0}
              amount={claimRecord?.claimableAmount ?? '0'}
              account={arkeoAccount}
              name={username}
              disconnect={() => {
                dispatch({ type: 'RESET_ARKEO' })
                disconnect?.()
              }}
            />
          ) : (
            <MotionImage
              w="150px"
              h="150px"
              src={ArkeoLogo}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            />
          )}
        </MotionFlex>

        <MotionBox
          width="100%"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Text my="8px" height="16px" color="red.500">
            {errorMessage}
          </Text>

          <MotionButton
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
          >
            {arkeoAccount ? 'Next' : 'Connect Wallet'}
          </MotionButton>
        </MotionBox>
      </MotionFlex>
    </AnimatePresence>
  )
}
