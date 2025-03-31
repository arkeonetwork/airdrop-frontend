import { useState } from 'react'
import { Client } from '../../ts-client'
import { useConnect } from '@src/pages/Connect/ConnectContext'
import axios from 'axios'
import { Registry } from '@cosmjs/proto-signing'
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
    return result
  }

  const fundArkeo = async () => {
    const data = await axios.post(`${thorServer}/fund`, {
      arkeoAddress: arkeoAccount,
      ethAddress: ethAccount,
      signature: signature,
      chain: isTestnet ? 'tarkeo' : 'arkeo',
    })
    return data
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
          data = await fundArkeo()
        }
      } catch (error) {
        data = await fundArkeo()
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
              console.info('✅ Fund succeeded', tx)
              break
            } else {
              console.error('❌ Fund failed', tx)
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
          await new Promise((resolve) => setTimeout(resolve, 2500))
        }
      }

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
