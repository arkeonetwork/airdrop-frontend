import { Box, Button, Link } from '@chakra-ui/react'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { Account } from '@components/Account'
import {
  Link as ReactRouterLink,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useGetClaim } from '@hooks/useGetClaim'

type AddressCheckParams = {
  address?: string
}

export const AddressCheck = () => {
  const [amount, setAmount] = useState('0')
  const navigate = useNavigate()
  const { address }: AddressCheckParams = useParams()

  const { claimRecord, error } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    if (!claimRecord && !error) return

    const amount = claimRecord?.claimableAmount?.amount ?? '0'
    if (amount === '0') {
      navigate('/check')
    } else {
      setAmount(amount)
    }
  }, [claimRecord, error])

  return (
    <Panel header="Congrats!" desc="You are eligible for the Arkeo airdrop!">
      <Box p="32px">
        <Account amount={amount} account={address!} />
        <Button mb={2} onClick={() => navigate('/claim')}>Claim Arkeo</Button>
        <Link as={ReactRouterLink} to='/check' mt={10}>
          Go Back
        </Link>
      </Box>
    </Panel>
  )
}
