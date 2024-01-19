import { Box, Button } from '@chakra-ui/react'
import { Panel } from '@components/Panel'
import React from 'react'
import { Account } from '@components/Account'
import { useNavigate, useParams } from 'react-router-dom'

type ValidCheckParams = {
  address?: string
  amount?: string
}

export const ValidCheck = () => {
  const navigate = useNavigate()
  const { address, amount }: ValidCheckParams = useParams()

  // redirect on invalid info
  if (!address || !amount) {
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
