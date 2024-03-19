import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Image, Flex, Link } from '@chakra-ui/react'
import ArkeoLogo from '@assets/arkeo-symbol.svg'
import { useConnect } from '../ConnectContext'
import { toDecimal } from '@utils/functions'
import { useClaim } from '@hooks/useClaim'
import { Link as ReactRouterLink } from 'react-router-dom'

type Props = {}

export const Claim: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    state: { step, totalClaimAmount },
    dispatch,
  } = useConnect()
  const { claimRecord, isLoading, isSucceeded, error } = useClaim()

  useEffect(() => {
    if (!error) {
      setErrorMessage('')
      return
    }
    const errorString = error.toString()
    if (errorString.includes('no claimable amount')) {
      setErrorMessage('You are not eligible for the Arkeo airdrop')
    } else if (errorString.includes('Airdrop has ended')) {
      setErrorMessage('Airdrop Has Ended')
    } else if (errorString.includes('failed to validate signature')) {
      setErrorMessage('Invalid Ethereum Signature')
    } else if (errorString.includes('No signature')) {
      setErrorMessage('No Ethereum Signature Found')
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

  const nothingToClaim = totalClaimAmount == 0

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
          <Text pb="8px" fontWeight={900}>
            Claim Arkeo
          </Text>
          <Text fontWeight={500} color="grey.50">
            You have connected all of your wallets, now all you need to do is
            claim your Arkeo airdrop tokens.
          </Text>
        </Box>
        <Flex textAlign="center" flexDir="column" alignItems="center">
          <Image w="64px" h="64px" src={ArkeoLogo} />
          <Text pt="8px" fontSize="24px" lineHeight="normal" fontWeight={900}>
            {toDecimal(totalClaimAmount)} ARKEO
          </Text>
          <Text color="grey.50" lineHeight="normal" fontWeight={400}>
            Available to Claim
          </Text>
        </Flex>
        <Flex w="100%" alignItems="center" flexDirection="column">
          <Text height="16px" mb={'20px'} color="red.500">
            {errorMessage}
          </Text>
          <Button
            isLoading={isLoading}
            isDisabled={nothingToClaim}
            onClick={claimArkeo}
          >
            {totalClaimAmount > 0 ? 'Claim' : 'Nothing to Claim'}
          </Button>
          {nothingToClaim && (
            <Link
              pl="6px"
              pt="6px"
              as={ReactRouterLink}
              onClick={() => dispatch({ type: 'RESET' })}
            >
              Try Again
            </Link>
          )}
        </Flex>
      </Flex>
    </>
  )
}
