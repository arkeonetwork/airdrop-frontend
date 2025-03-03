import { Box, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { useGetClaim } from '@hooks/useGetClaim'

export const Check = () => {
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const { claimRecord } = useGetClaim({
    address: address,
  })

  useEffect(() => {
    if (claimRecord) {
      const claimAmount = parseInt(claimRecord?.claimableAmount, 10)
      if (claimAmount > 0) {
        navigate('/check/' + address)
      } else {
        setErrorMessage('You are not eligible for the Arkeo airdrop')
      }
    }
  }, [claimRecord?.claimableAmount])

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
        <Box>
          <Input
            variant="filled"
            onChange={changeAddress}
            placeholder="Paste Address"
            value={address}
          />
        </Box>
        <Text my="8px" height="16px" color="red.500">
          {errorMessage}
        </Text>

        <Link as={ReactRouterLink}>Learn more about Arkeo</Link>
      </Box>
    </Panel>
  )
}
