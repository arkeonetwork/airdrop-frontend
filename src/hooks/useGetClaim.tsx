import axios from 'axios'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { bech32 } from 'bech32'

const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const isTestnet = import.meta.env.VITE_IS_TESTNET

enum ChainEnum {
  INVALID = -1,
  ARKEO = 0,
  ETHEREUM = 1,
}

type UseGetClaim = {
  address: string
}

export const useGetClaim = ({ address }: UseGetClaim) => {
  const [claimRecord, setClaimRecord] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | unknown>(null)
  const arkeoPrefix = isTestnet ? 'tarkeo' : 'arkeo'
  const validCosmosPrefix = ['cosmos', 'juno', arkeoPrefix]

  const calculateClaimAmount = (claimRecord: any) => {
    const parseAmount = (amount: string) => parseInt(amount, 10) ?? 0

    const amountClaim = parseAmount(claimRecord?.amount_claim?.amount)
    const amountDelegate = parseAmount(claimRecord?.amount_delegate?.amount)
    const amountVote = parseAmount(claimRecord?.amount_vote?.amount)

    return {
      amountClaim,
      amountDelegate,
      amountVote,
    }
  }

  const getChainType = (address: string) => {
    const prefix = bech32.decode(address).prefix
    if (ethers.isAddress(address)) {
      return { chain: ChainEnum.ETHEREUM, address }
    } else if (validCosmosPrefix.includes(prefix)) {
      const updatedAddress = arkeoPrefix === prefix
        ? address
        : bech32.encode(arkeoPrefix, bech32.decode(address).words)
      return { chain: ChainEnum.ARKEO, address: updatedAddress }
    }
    return { chain: ChainEnum.INVALID, address }
  }

  const buildUrl = (path: string, address: string) => {
    return arkeoEndpointRest + path + '/' + address
  }

  const getClaimRecord = async () => {
    try {
      const { chain, address: convertedAddress } = getChainType(address)
      console.log({ chain, convertedAddress })
      if (chain !== ChainEnum.INVALID) {
        setIsLoading(true)
        setError(null)
        const params = { chain }
        const url = buildUrl('/arkeo/claim/claimrecord', convertedAddress)
        const { data } = await axios.get(url, { params })
        const claimAmounts = calculateClaimAmount(data.claim_record)
        setClaimRecord({
          ...data.claim_record,
          ...claimAmounts,
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
    getClaimRecord()
  }, [arkeoEndpointRest, address])

  return { claimRecord, isLoading, error }
}
