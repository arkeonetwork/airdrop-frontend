import { Box, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { useClaim } from '@hooks/useClaim'

export const Check = () => {
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const { claimRecord, error } = useClaim({
    path: '/claim/claimrecord',
    address,
  })

  useEffect(() => {
    if (claimRecord) {
      const amount = calculateClaimAmount()
      if (amount > 0) {
        console.log('NAV')
        navigate('/check/valid/' + address + '/' + amount)
      } else {
        setErrorMessage('You are not eligible for the Arkeo airdrop')
      }
    }
  }, [claimRecord])
  console.log('claimRecord', claimRecord)
  console.log('error', error)

  const calculateClaimAmount = () => {
    const parseAmount = (amount: string) => parseInt(amount, 10) ?? 0

    const amountClaim = parseAmount(claimRecord?.amount_claim?.amount)
    const amountDelegate = parseAmount(claimRecord?.amount_delegate?.amount)
    const amountVote = parseAmount(claimRecord?.amount_vote?.amount)

    return amountClaim + amountDelegate + amountVote
  }

  const changeAddress = (event: any) => {
    setAddress(event.target.value)
    if (errorMessage) setErrorMessage('')
  }

  return (
    <Panel
      header="Claim Arkeo"
      desc="Paste your Arkeo, Cosmos, or Ethereum address to check eligibility"
    >
      <Box p="32px">
        <Box mt="32px">
          <Input
            variant="filled"
            onChange={changeAddress}
            placeholder="Paste Address"
            value={address}
          />
        </Box>
        <Text my="16px" height="16px" color="red.500">
          {errorMessage}
        </Text>

        <Link as={ReactRouterLink}>
          Learn more about Arkeo
        </Link>
      </Box>
    </Panel>
  )
}
