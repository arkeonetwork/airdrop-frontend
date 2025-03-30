import { useState } from 'react'
import { Client } from '../../ts-client'
import { useConnect } from '@src/pages/Connect/ConnectContext'
import axios from 'axios'
import {
  Registry,
} from '@cosmjs/proto-signing'
import {
  MsgClaimArkeo,
  MsgClaimArkeoResponse,
  MsgClaimEth,
} from '../../ts-client/arkeo.claim/module'
import { useChain } from '@cosmos-kit/react'
import { AminoTypes, defaultRegistryTypes } from '@cosmjs/stargate'
import { SigningStargateClient } from '@cosmjs/stargate'
import { msgTypes } from '../../ts-client/arkeo.claim/registry'
import { aminoConverters } from '@utils/functions'

const isTestnet = import.meta.env.VITE_IS_TESTNET === 'true'
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC
const thorServer = import.meta.env.VITE_THORCHAIN_SERVER

export const useClaim = () => {
  const [isSucceeded, setIsSucceeded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | unknown>()
  const {
    getOfflineSignerAmino,
    getSigningStargateClient,
    address,
    chain,
    status,
    broadcast,
  } = useChain('arkeo')

  const {
    state: {
      arkeoInfo: { account: arkeoAccount },
      ethInfo: { account: ethAccount, claimableAmount: ethAmount, signature },
      thorInfo: { claimableAmount: thorAmount, delegateTx: thorDelegateTx },
    },
    dispatch,
  } = useConnect()

  const claimArkeo = async () => {
    if (!address) return
    const signer = await getOfflineSignerAmino()
    const registry = new Registry([...defaultRegistryTypes, ...msgTypes])
    const client = await SigningStargateClient.connectWithSigner(
      arkeoEndpointRpc,
      signer,
      {
        aminoTypes: new AminoTypes(aminoConverters),
        registry,
      },
    )
    const msg = {
      typeUrl: '/arkeo.claim.MsgClaimArkeo',
      value: MsgClaimArkeo.fromPartial({ creator: address }),
    }

    const result = await client.signAndBroadcast(
      address,
      [msg],
      {
        amount: [{ denom: 'utoken', amount: '5000' }],
        gas: '200000',
      },
      '',
    )

    console.log('result', result)
    return result
  }

  const claimEth = async () => {
    if (!address) return
    const signer = await getOfflineSignerAmino()
    const registry = new Registry([...defaultRegistryTypes, ...msgTypes])
    const client = await SigningStargateClient.connectWithSigner(
      arkeoEndpointRpc,
      signer,
      {
        aminoTypes: new AminoTypes(aminoConverters),
        registry,
      },
    )
    const msg = {
      typeUrl: '/arkeo.claim.MsgClaimEth',
      value: MsgClaimEth.fromPartial({
        creator: address,
        ethAddress: ethAccount,
        signature: signature,
      }),
    }

    const result = await client.signAndBroadcast(
      address,
      [msg],
      {
        amount: [{ denom: 'utoken', amount: '5000' }],
        gas: '200000',
      },
      '',
    )

    console.log('result', result)
    return result
  }

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

      if (thorAmount > 0 && thorDelegateTx) {
        const { data } = await axios.post(`${thorServer}/claim`, {
          txHash: thorDelegateTx,
        })
        if (data?.message?.includes('updated')) {
          dispatch({ type: 'SET_THORCHAIN_DELEGATE_TX', payload: undefined })
        } else {
          throw new Error('Thorchain delegate tx failed')
        }
      }

      let data
      try {
        const accountInfo =
          await client.CosmosAuthV1Beta1.query.queryAccount(arkeoAccount)
        if (!accountInfo) {
          // Account doesn't exist, call /fund endpoint
          data = await axios.post(`${thorServer}/fund`, {
            arkeoAddress: arkeoAccount,
            ethAddress: ethAccount,
            signature: signature,
            chain: isTestnet ? 'tarkeo' : 'arkeo',
          })
        }
      } catch (error) {
        // If query fails, assume account doesn't exist and try to fund it
        data = await axios.post(`${thorServer}/fund`, {
          arkeoAddress: arkeoAccount,
          ethAddress: ethAccount,
          signature: signature,
          chain: isTestnet ? 'tarkeo' : 'arkeo',
        })
      }

      if (data) {
        let attempts = 0
        const maxAttempts = 3

        while (attempts < maxAttempts) {
          try {
            const tx = await client.CosmosTxV1Beta1.query.serviceGetTx(
              data.data.transaction,
            )
            if (tx && tx.status === 200) {
              console.log('✅ TX succeeded', tx)
              break
            } else {
              console.error('❌ TX failed', tx)
              if (attempts === maxAttempts - 1) {
                throw new Error('Transaction failed after maximum attempts')
              }
            }
          } catch (error) {
            if (attempts === maxAttempts - 1) {
              throw error
            }
          }

          attempts++
          // Wait 2.5 seconds between attempts
          await new Promise((resolve) => setTimeout(resolve, 2500))
        }
      }

      // await client.useKeplr({
      //   rpc: arkeoEndpointRpc,
      //   rest: arkeoEndpointRest,
      // })

      let result
      if (ethAccount && ethAmount > 0) {
        if (!signature) {
          throw new Error('No signature')
        }
        result = await claimEth()
      } else {
        result = await claimArkeo()
      }

      if (!result) {
        throw new Error('Claim was not successful')
      }
      console.info('Response: ', result)

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

      console.info('Response: ', MsgClaimArkeoResponse.toJSON(result))

      if (result.code !== 0 && result.rawLog) {
        console.error(result.rawLog)
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
