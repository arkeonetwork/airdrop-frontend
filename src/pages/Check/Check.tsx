import { Box, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Panel } from '@components/Panel'
import React, { useEffect, useState } from 'react'
import { useClaim } from '@hooks/useClaim'
import axios from 'axios'
import { useChain, useWalletClient } from '@cosmos-kit/react'
import { SigningStargateClient, StdFee } from '@cosmjs/stargate'
import { Client } from '../../../ts-client'
import { DirectSecp256k1HdWallet, encodePubkey } from '@cosmjs/proto-signing'
import { bech32 } from 'bech32'

const arkeoEndpoint = import.meta.env.VITE_ARKEO_ENDPOINT

export const Check = () => {
  const [address, setAddress] = useState(
    'tarkeo19358z26jwh3e4rd6psxqf8q6f3pe6f8s7v0x2a',
  )
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const {
    status,
    username,
    // address,
    message,
    wallet,
    connect,
    getRpcEndpoint,
    disconnect,
    signAndBroadcast,
    broadcast,
    openView,
    sign,
    signDirect,
    isWalletConnected,
    getSigningStargateClient,
  } = useChain('localarkeo')

  const { client } = useWalletClient('keplr-extension')

  const getBalance = async () => {}

  const fetchData = async () => {
    console.log('address', address)
    if (!address) connect()
    try {
      if (address) {
        const endpoint = await getRpcEndpoint()
        const client = await getSigningStargateClient()
        console.log({ client })
        const balance = await client.getBalance(address, 'uarkeo')
        console.log({ address, isWalletConnected, endpoint, balance })

        const claimArkeoMsg = {
          typeUrl: '/arkeo.claim.MsgClaimArkeo',
          value: {
            sender: address,
          },
        }

        const fee: StdFee = {
          amount: [
            {
              denom: 'uarkeo',
              amount: '1',
            },
          ],
          gas: '86364',
        }

        const response = await sign([claimArkeoMsg], fee)
        console.log(response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClaimRecord = async () => {
    console.log('HANDLE CLAIM RECORD')

    if (!address) connect()
    // if (wallet) {
      try {
        const mnemonic =
          'clog swear steak glide artwork glory solution short company borrow aerobic idle corn climb believe wink forum destroy miracle oak cover solid valve make'
        const walletBob = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
          prefix: 'tarkeo',
        })
        console.log('WALLET', wallet)
        const [firstAccount] = await walletBob.getAccounts()
        console.log({ firstAccount })

        const client = new Client(
          {
            apiURL: 'http://localhost:1317',
            rpcURL: 'http://localhost:26657',
            prefix: 'tarkeo',
          },
          walletBob,
        )

        console.log('client connected', client)

        // client?.getOfflineSigner()

        const {
          data: { balance },
        } = await client.CosmosBankV1Beta1.query.queryBalance(
          firstAccount.address,
          { denom: 'uarkeo' },
        )
        console.log({ balance })
        // const stargateClient = await getSigningStargateClient()
        // console.log('stargate client connected')

        // const {
        //   data: { claim_record },
        // } = await client.ArkeoClaim.query.queryClaimRecord(
        //   firstAccount.address,
        //   {
        //     chain: 0,
        //   } as any,
        // )
        // console.log({ claim_record })

        // console.log(
        //   'DECODED EXAMPLE ',
        //   bech32.decode(
        //     'tarkeo1q5g3gpczpgdpyrshzyv32qcdrgq3qpsqpyrsqxsfzyq3jxsfqugqfj8e2x',
        //   ),
        // )
        let encoder = new TextEncoder()
        let decoder = new TextDecoder()
        const creator = encoder.encode(
          '2C68712B5275E39A8DBA0C0C049C1A4C439D24F0',
        )
        console.log({
          creator,
          pubkey: firstAccount.pubkey,
        })

        // THIS DOESN'T WORK
        const result = await client.ArkeoClaim.tx.sendMsgClaimArkeo({
          value: { creator: encoder.encode(firstAccount.address) },
          memo: '',
        })

        //tarkeo1q5g3gpczpgdpyrshzyv32qcdrgq3qpsqpyrsqxsfzyq3jxsfqugqfj8e2x
        //tarkeo1qf0vmghuakef4zxnh6hv2gewmqgm5tdg9f6w3qxjpw49xnsjf36f702tm6r

        // THIS WORKS
        // const result = await client.CosmosBankV1Beta1.tx.sendMsgSend({
        //   value: {
        //     amount: [
        //       {
        //         amount: '200',
        //         denom: 'uarkeo',
        //       },
        //     ],
        //     fromAddress: firstAccount.address,
        //     toAddress: 'tarkeo1xrz7z3zwtpc45xm72tpnevuf3wn53re8q4u4nr',
        //   },
        //   fee: {
        //     amount: [{ amount: '0', denom: 'uarkeo' }],
        //     gas: '200000',
        //   },
        //   memo: '',
        // })




        console.log({ result })
      } catch (error) {
        console.error('Error claiming record:', error)
      }
    // }
  }

  useEffect(() => {
    console.log('USE EFFECT', address)
    handleClaimRecord()
  }, [address])

  // useEffect(() => {
  //   if (claimRecord) {
  //     if (claimRecord?.total > 0) {
  //       navigate('/check/valid/' + address + '/' + claimRecord?.total)
  //     } else {
  //       setErrorMessage('You are not eligible for the Arkeo airdrop')
  //     }
  //   }
  // }, [claimRecord?.total])
  // console.log('claimRecord', claimRecord)
  // console.log('error', error)

  const changeAddress = (event: any) => {
    // setAddress(event.target.value)
    if (errorMessage) setErrorMessage('')
  }

  return (
    <Panel
      header="Claim Arkeo"
      desc="Paste your Arkeo, Cosmos, or Ethereum address to check eligibility"
    >
      <Box p="32px">
        <Box mt="32px">
          <Input
            variant="filled"
            onChange={changeAddress}
            placeholder="Paste Address"
            value={address}
          />
        </Box>
        <Text my="16px" height="16px" color="red.500">
          {errorMessage}
        </Text>

        <Link as={ReactRouterLink}>Learn more about Arkeo</Link>
      </Box>
    </Panel>
  )
}
