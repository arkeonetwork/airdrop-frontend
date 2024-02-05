import { useState } from 'react'
import { bech32 } from 'bech32'
import { Client } from '../../ts-client'

type UseClaim = {
  address: string
}

export const useClaim = ({ address }: UseClaim) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | unknown>(null)

  const claimRecord = async () => {
    console.log('CLAIM RECORD')

    try {
      const client = new Client({
        apiURL: 'http://localhost:1317',
        rpcURL: 'http://localhost:26657',
        prefix: 'tarkeo',
      })

      await client.useKeplr({
        chainName: 'arkeo-testnet-v2',
        rpc: 'http://localhost:26657',
        rest: 'http://localhost:1317',
        // stakeCurrency: {
        //   coinDenom: 'tarkeo',
        //   coinMinimalDenom: 'uarkeo',
        //   coinDecimals: '8',
        // },
      })

      console.log('client connected', client)

      // Get Balance of tarkeo
      // const {
      //   data: { balance },
      // } = await client.CosmosBankV1Beta1.query.queryBalance(
      //   address,
      //   { denom: 'uarkeo' },
      // )
      // console.log({ balance })

      const result = await client.ArkeoClaim.tx.sendMsgClaimArkeo({
        value: {
          creator: bech32.fromWords(bech32.decode(address).words),
        },
        memo: '',
      })

      console.log({ result })
    } catch (error) {
      setError(error)
      console.error('Error claiming record:', error)
    }
  }

  return { claimRecord, isLoading, error }
}
