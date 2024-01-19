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
  path: string
  address: string
}

export const useClaim = ({ path, address }: UseClaim) => {
  const [claimRecord, setClaimRecord] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | unknown>(null)
  const validCosmosPrefix = ['cosmos', 'tarkeo', 'arkeo']

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
      if (chain !== ChainEnum.INVALID) {
        setIsLoading(true)
        setError(null)
        const params = { chain }
        const url = buildUrl(path, address)
        const { data } = await axios.get(url, { params })
        setClaimRecord(data.claim_record)
      }
    } catch (error) {
      setError(error)
      setClaimRecord(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [arkeoEndpoint, address, path])

  return { claimRecord, isLoading, error }
}
