import axios from 'axios'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { bech32 } from 'bech32'

const arkeoEndpoint = import.meta.env.VITE_ARKEO_ENDPOINT

enum ChainEnum {
  INVALID = -1,
  ARKEO = 0,
  ETHEREUM = 1,
}

type UseClaim = {
  address: string
}

export const useClaim = ({ address }: UseClaim) => {
  const [claimRecord, setClaimRecord] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | unknown>(null)
  const validCosmosPrefix = ['cosmos', 'tarkeo', 'arkeo']

  const calculateClaimAmount = (claimRecord: any) => {
    const parseAmount = (amount: string) => parseInt(amount, 10) ?? 0

    const amountClaim = parseAmount(claimRecord?.amount_claim?.amount)
    const amountDelegate = parseAmount(claimRecord?.amount_delegate?.amount)
    const amountVote = parseAmount(claimRecord?.amount_vote?.amount)

    return amountClaim + amountDelegate + amountVote
  }

  const getChainType = (address: string) => {
    if (ethers.isAddress(address)) {
      return ChainEnum.ETHEREUM
    } else if (validCosmosPrefix.includes(bech32.decode(address).prefix)) {
      return ChainEnum.ARKEO
    }
    return ChainEnum.INVALID
  }

  const buildUrl = (path: string, address: string) => {
    return arkeoEndpoint + path + '/' + address
  }

  const fetchData = async () => {
    try {
      const chain = getChainType(address)
      console.log({ chain })
      if (chain !== ChainEnum.INVALID) {
        setIsLoading(true)
        setError(null)
        const params = { chain }
        const url = buildUrl('/arkeo/claim/claimrecord', address)
        const { data } = await axios.get(url, { params })
        setClaimRecord({
          ...data.claim_record,
          total: calculateClaimAmount(data.claim_record),
        })
      }
    } catch (error) {
      console.error(error)
      setError(error)
      setClaimRecord(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [arkeoEndpoint, address])

  return { claimRecord, isLoading, error }
}
