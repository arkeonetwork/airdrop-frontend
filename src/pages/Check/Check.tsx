import { Box, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { useClaim } from '@hooks/useClaim'
import axios from 'axios'

const arkeoEndpoint = import.meta.env.VITE_ARKEO_ENDPOINT

export const Check = () => {
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const { claimRecord, error } = useClaim({
    address,
  })

  const fetchData = async () => {
    try {
      const url = arkeoEndpoint + '/cosmos/tx/v1beta1/txs'
      const { data } = await axios.post(url, {
        type: 'arkeo.claim.MsgClaimEth',
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   if (claimRecord) {
  //     if (claimRecord?.total > 0) {
  //       navigate('/check/valid/' + address + '/' + claimRecord?.total)
  //     } else {
  //       setErrorMessage('You are not eligible for the Arkeo airdrop')
  //     }
  //   }
  // }, [claimRecord?.total])
  console.log('claimRecord', claimRecord)
  console.log('error', error)

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

        <Link as={ReactRouterLink}>Learn more about Arkeo</Link>
      </Box>
    </Panel>
  )
}
