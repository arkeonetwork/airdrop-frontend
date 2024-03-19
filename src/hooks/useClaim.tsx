import { useState } from 'react'
import { bech32 } from 'bech32'
import { Client } from '../../ts-client'
import { useConnect } from '@src/pages/Connect/ConnectContext'

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC

export const useClaim = () => {
  const [isSucceeded, setIsSucceeded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | unknown>()
  const {
    state: {
      arkeoInfo: { account: arkeoAccount },
      ethInfo: { account: ethAccount, amountClaim: ethAmount, signature },
    },
  } = useConnect()

  const claimRecord = async () => {
    try {
      if (!arkeoAccount) return

      setIsLoading(true)
      setError(null)
      setIsSucceeded(false)
      const client = new Client({
        apiURL: arkeoEndpointRest,
        rpcURL: arkeoEndpointRpc,
        prefix: isTestnet ? 'tarkeo' : 'arkeo',
      })

      await client.useKeplr({
        rpc: arkeoEndpointRpc,
        rest: arkeoEndpointRest,
      })
      const creator = Uint8Array.from(
        bech32.fromWords(bech32.decode(arkeoAccount).words),
      )
      let result
      if (ethAccount && ethAmount > 0) {
        if (!signature) {
          throw new Error('No signature')
        }
        result = await client.ArkeoClaim.tx.sendMsgClaimEth({
          value: {
            ethAddress: ethAccount,
            signature,
            creator,
          },
          memo: '',
        })
      } else {
        result = await client.ArkeoClaim.tx.sendMsgClaimArkeo({
          value: {
            creator,
          },
          memo: '',
        })
      }

      console.info({ result })
      if (result.code !== 0) {
        // TODO better error handling
        throw new Error(result.rawLog)
      } else {
        setIsSucceeded(true)
      }
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { claimRecord, isLoading, isSucceeded, error }
}
