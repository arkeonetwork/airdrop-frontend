import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, Link } from '@chakra-ui/react'
import ArkeoLogo from '@assets/arkeo-symbol.svg'
import { useConnect } from '../ConnectContext'
import { toDecimal } from '@utils/functions'
import { useClaim } from '@hooks/useClaim'
import { Link as ReactRouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionImage = motion(Image)
const MotionButton = motion(Button)
const MotionLink = motion(Link)

type Props = {}

export const Claim: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    state: {
      step,
      arkeoInfo: { claimableAmount: arkeoAmountClaim },
      thorInfo: { claimableAmount: thorAmountClaim },
      ethInfo: { claimableAmount: ethAmountClaim },
    },
    dispatch,
  } = useConnect()
  const { claimRecord, isLoading, isSucceeded, error } = useClaim()

  useEffect(() => {
    if (!error) {
      setErrorMessage('')
      return
    }
    const errorString = error.toString()

    if (errorString.toLowerCase().includes('no claimable amount')) {
      setErrorMessage('You are not eligible for the Arkeo airdrop')
    } else if (errorString.toLowerCase().includes('airdrop has ended')) {
      setErrorMessage('Airdrop Has Ended')
    } else if (
      errorString.toLowerCase().includes('failed to validate signature')
    ) {
      setErrorMessage('Invalid Ethereum Signature')
    } else if (errorString.toLowerCase().includes('no signature')) {
      setErrorMessage('No Ethereum Signature Found')
    } else if (errorString.toLowerCase().includes('request rejected')) {
      setErrorMessage('Transaction Cancelled')
    } else if (errorString.toLowerCase().includes('no unfunded claim records')) {
      setErrorMessage('No Claims Found')
    } else {
      setErrorMessage('Something Went Wrong')
    }
  }, [error])

  useEffect(() => {
    if (isSucceeded) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    }
  }, [isSucceeded])

  const claimArkeo = () => {
    claimRecord()
  }
  const totalClaimAmount = arkeoAmountClaim + thorAmountClaim + ethAmountClaim
  const nothingToClaim = totalClaimAmount === 0

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
          <Text pb="8px" fontWeight={900}>
            Claim Arkeo
          </Text>
          <Text fontWeight={500} color="grey.50">
            You have connected all of your wallets, now all you need to do is
            claim your Arkeo airdrop tokens.
          </Text>
        </MotionBox>

        <MotionFlex
          textAlign="center"
          flexDir="column"
          alignItems="center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MotionImage
            w="64px"
            h="64px"
            src={ArkeoLogo}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          />
          <Text pt="8px" fontSize="24px" lineHeight="normal" fontWeight={900}>
            {toDecimal(totalClaimAmount)} ARKEO
          </Text>
          <Text color="grey.50" lineHeight="normal" fontWeight={400}>
            Available to Claim
          </Text>
        </MotionFlex>

        <MotionFlex
          w="100%"
          alignItems="center"
          flexDirection="column"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Text height="16px" mb={'20px'} color="red.500">
            {errorMessage}
          </Text>
          <MotionButton
            isLoading={isLoading}
            isDisabled={nothingToClaim}
            onClick={claimArkeo}
            whileTap={{ scale: 0.95 }}
          >
            {totalClaimAmount > 0 ? 'Claim' : 'Nothing to Claim'}
          </MotionButton>
          {nothingToClaim && (
            <MotionLink
              pl="6px"
              pt="6px"
              as={ReactRouterLink}
              onClick={() => dispatch({ type: 'RESET' })}
            >
              Try Again
            </MotionLink>
          )}
        </MotionFlex>
      </MotionFlex>
    </AnimatePresence>
  )
}
