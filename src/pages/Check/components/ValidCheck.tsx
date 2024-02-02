import { Box, Button } from '@chakra-ui/react'
import { Panel } from '@components/Panel'
import React from 'react'
import { Account } from '@components/Account'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetClaim } from '@hooks/useGetClaim'

type ValidCheckParams = {
  address?: string
}

export const ValidCheck = () => {
  const navigate = useNavigate()
  const { address }: ValidCheckParams = useParams()

  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })
  const amount = claimRecord?.amount_claim?.amount ?? '0'

  if (!address || !amount || amount === '0') {
    navigate('/check')
    return null
  }

  return (
    <Panel header="Congrats!" desc="You are eligible for the Arkeo airdrop!">
      <Box p="32px">
        <Account amount={amount} account={address} />
        <Button onClick={() => navigate('/claim')}>Claim Arkeo</Button>
      </Box>
    </Panel>
  )
}
