import axios from 'axios'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { bech32 } from 'bech32'

const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST || process.env.VITE_ARKEO_ENDPOINT_REST
const isTestnet = import.meta.env.VITE_IS_TESTNET === 'true' || process.env.VITE_IS_TESTNET === 'true'

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | unknown>(null)
  const arkeoPrefix = isTestnet ? 'tarkeo' : 'arkeo'
  const validCosmosPrefix = ['cosmos', 'thor', arkeoPrefix]

  const calculateClaimAmount = (claimRecord: any, claimable: any) => {
    const parseAmount = (amount: string) => parseInt(amount, 10) ?? 0
    const claimableAmount = parseAmount(claimable?.amount?.amount)
    const amountClaim = parseAmount(claimRecord?.amount_claim?.amount)
    const amountDelegate = parseAmount(claimRecord?.amount_delegate?.amount)
    const amountVote = parseAmount(claimRecord?.amount_vote?.amount)
    const totalAmount = (amountClaim + amountDelegate + amountVote).toString()
    return {
      claimableAmount,
      totalAmount,
    }
  }

  const getChainType = (address: string) => {
    if (ethers.isAddress(address)) {
      return { chain: ChainEnum.ETHEREUM, address }
    }
    const prefix = bech32.decode(address).prefix
    if (validCosmosPrefix.includes(prefix)) {
      const updatedAddress =
        arkeoPrefix === prefix
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

      if (chain !== ChainEnum.INVALID) {
        setIsLoading(true)
        setError(null)
        const params = { chain }
        const claimRecordUrl = buildUrl('/arkeo/claim/claimrecord', convertedAddress)
        const { data: claimRecord } = await axios.get(claimRecordUrl, { params })
        const claimableUrl = buildUrl('/arkeo/claim/claimable', convertedAddress)
        const { data: claimable } = await axios.get(claimableUrl, { params })
        const claimAmounts = calculateClaimAmount(claimRecord.claim_record, claimable)

        setClaimRecord({
          ...claimRecord.claim_record,
          ...claimAmounts,
        })
      }
    } catch (error) {
      setError(error)
      setClaimRecord(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getClaimRecord()
  }, [address])

  return { claimRecord, isLoading, error }
}
