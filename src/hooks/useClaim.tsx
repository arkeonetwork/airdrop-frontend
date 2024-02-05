import { useState } from 'react'
import { bech32 } from 'bech32'
import { Client } from '../../ts-client'
import { useChain } from '@cosmos-kit/react'

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC

export const useClaim = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | unknown>()

  const claimRecord = async (address: string) => {
    console.log('CLAIM RECORD', address)
    if (!address) {
      return
    }
    try {
      setIsLoading(true)
      setError(null)
      const client = new Client({
        apiURL: arkeoEndpointRest,
        rpcURL: arkeoEndpointRpc,
        prefix: isTestnet ? 'tarkeo' : 'arkeo',
      })

      await client.useKeplr({
        rpc: arkeoEndpointRpc,
        rest: arkeoEndpointRest,
      })

      const result = await client.ArkeoClaim.tx.sendMsgClaimArkeo({
        value: {
          creator: Uint8Array.from(
            bech32.fromWords(bech32.decode(address).words),
          ),
        },
        memo: '',
      })

      console.log({ result })
      if (result.code !== 0) {
        throw new Error(result.rawLog)
      }
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { claimRecord, isLoading, error }
}
