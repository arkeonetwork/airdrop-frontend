import { Box, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { useGetClaim } from '@hooks/useGetClaim'
import axios from 'axios'
import { useChain, useWalletClient } from '@cosmos-kit/react'
import { SigningStargateClient, StdFee } from '@cosmjs/stargate'
import { Client } from '../../../ts-client'
import { DirectSecp256k1HdWallet, encodePubkey } from '@cosmjs/proto-signing'
import { bech32 } from 'bech32'
import { rpc } from 'viem/utils'

const arkeoEndpoint = import.meta.env.VITE_ARKEO_ENDPOINT

export const Check = () => {
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const { claimRecord } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    if (claimRecord) {
      const claimAmount = parseInt(claimRecord?.amount_claim?.amount, 10)
      if (claimAmount > 0) {
        navigate('/check/valid/' + address)
      } else {
        setErrorMessage('You are not eligible for the Arkeo airdrop')
      }
    }
  }, [claimRecord?.amount_claim?.amount])
  console.log('claimRecord', claimRecord)

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
