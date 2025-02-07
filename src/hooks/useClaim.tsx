import { useState } from 'react'
import { bech32 } from 'bech32'
import { Client } from '../../ts-client'
import { useConnect } from '@src/pages/Connect/ConnectContext'
import axios from 'axios'
import { coins } from '@cosmjs/proto-signing'
import { MsgClaimArkeoResponse } from '../../ts-client/arkeo.claim/module'

const isTestnet = import.meta.env.VITE_IS_TESTNET
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC
const thorServer = import.meta.env.VITE_THORCHAIN_SERVER

export const useClaim = () => {
  const [isSucceeded, setIsSucceeded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | unknown>()
  const {
    state: {
      arkeoInfo: { account: arkeoAccount },
      ethInfo: { account: ethAccount, amountClaim: ethAmount, signature },
      thorInfo: { amountClaim: thorAmount, delegateTx: thorDelegateTx },
    },
  } = useConnect()
  const fee = 200

  const claimRecord = async () => {
    try {
      if (!arkeoAccount) return

      setIsLoading(true)
      setError(null)
      setIsSucceeded(false)

      if (thorAmount > 0 && thorDelegateTx) {
        const { data } = await axios.post(`${thorServer}/claim`, {
          txHash: thorDelegateTx,
        })
      }

      const client = new Client({
        apiURL: arkeoEndpointRest,
        rpcURL: arkeoEndpointRpc,
        prefix: isTestnet ? 'tarkeo' : 'arkeo',
      })

      await client.useKeplr({
        rpc: arkeoEndpointRpc,
        rest: arkeoEndpointRest,
      })

      let result
      if (ethAccount && ethAmount > 0) {
        if (!signature) {
          throw new Error('No signature')
        }
        result = await client.ArkeoClaim.tx.sendMsgClaimEth({
          value: {
            creator: arkeoAccount,
            ethAddress: ethAccount,
            signature: signature,
          },
          fee: {
            amount: coins(fee, 'uarkeo'),
            gas: '200000',
          },
          memo: '',
        })
      } else {
        result = await client.ArkeoClaim.tx.sendMsgClaimArkeo({
          value: {
            creator: arkeoAccount,
          },
          fee: {
            amount: coins(fee, 'uarkeo'),
            gas: '200000',
          },
          memo: '',
        })
      }

      console.info('Response: ', result.msgResponses)

      // Convert the byte array to a string, but parse it as a protobuf message
      const response = result.msgResponses[0]
      const bytes = Object.values(response.value)

      // The first byte (10) is the field number 1 (address) with wire type 2 (length-delimited)
      // The second byte (45) is the length of the address
      const addressLength = bytes[1]
      const address = new TextDecoder().decode(
        new Uint8Array(bytes.slice(2, 2 + addressLength)),
      )

      // The remaining bytes contain the amount
      // byte 47 (16) is field number 2 (amount) with wire type 0 (varint)
      // bytes 48-49 (232, 7) represent the amount in varint encoding
      const amountBytes = bytes.slice(48) // Skip the field number/type byte
      let amount = BigInt(0)
      let multiplier = BigInt(1)

      for (let i = 0; i < amountBytes.length; i++) {
        amount += BigInt(amountBytes[i] & 0x7f) * multiplier
        multiplier *= BigInt(128)
      }

      console.info('Decoded Response:', {
        address,
        amount: Number(amount), // Convert back to number for display if the value is small enough
      })

      console.info(
        'Response: ',
        MsgClaimArkeoResponse.toJSON(result.msgResponses[0]),
      )

      if (result.code !== 0 && result.rawLog) {
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
