import React, { useEffect } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useSignTypedData, useDisconnect, useAccount } from 'wagmi'
import { useGetClaim } from '@hooks/useGetClaim'
import { keccak256 } from 'viem'

type Props = {}

export const Eth: React.FC<Props> = ({}) => {
  const {
    state: {
      step,
      totalClaimAmount,
      ethInfo: { account: ethAccount },
      arkeoInfo: { account: arkeoAccount },
      cosmosInfo: { account: cosmosAccount },
    },
    dispatch,
  } = useConnect()
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { claimRecord, error } = useGetClaim({
    address: address ?? '',
  })

  const { data, isError, isLoading, isSuccess, signTypedData, status, reset } =
    useSignTypedData()

  useEffect(() => {
    dispatch({ type: 'SET_ETH_SIGNATURE', payload: data })
  }, [data])

  useEffect(() => {
    if (!claimRecord) return
    if (status === 'success') {
      dispatch({ type: 'ADD_TOTAL_AMOUNTS', payload: claimRecord })
      dispatch({ type: 'SET_ETH_AMOUNT', payload: claimRecord.amountClaim })
    }
  }, [status, claimRecord])

  useEffect(() => {
    if (isSuccess && address) {
      dispatch({ type: 'SET_ETH_ACCOUNT', payload: address })
    }
  }, [isError, isLoading, isSuccess])

  const handleClick = () => {
    if (ethAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      if (address && arkeoAccount) {
        //signMessage()
        const dataToSign = {
          types: {
            Claim: [
              { name: 'address', type: 'address' },
              { name: 'arkeoAddress', type: 'string' },
              { name: 'amount', type: 'string' },
            ],
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'version', type: 'string' },
            ],
          },
          primaryType: 'Claim' as any,
          domain: {
            name: 'ArkdropClaim' as any,
            version: '1' as any,
            chainId: 1 as any,
          },
          message: {
            address: '0x92E14917A0508Eb56C90C90619f5F9Adbf49f47d',
            arkeoAddress: arkeoAccount,
            amount: '1800000',
          },
        }
        const hash = keccak256(JSON.stringify(dataToSign) as any)
        console.log({ hash })
        signTypedData(dataToSign)
      } else {
        open()
      }
    }
  }

  const renderWallet = () => {
    if (ethAccount) {
      return (
        <ConnectedAccount
          width="100%"
          amount={claimRecord?.amountClaim ?? '0'}
          account={ethAccount}
          disconnect={() => {
            disconnect()
            dispatch({ type: 'SUB_TOTAL_AMOUNTS', payload: claimRecord })
            dispatch({ type: 'RESET_ETH' })
            reset()
          }}
        />
      )
    }
    return <Image w="150px" h="150px" src={CosmosLogo} />
  }
  const buttonText = ethAccount
    ? 'Next'
    : address
      ? 'Sign With Wallet'
      : 'Connect Wallet'
  console.log({ status, isSuccess, data })
  return (
    <>
      <Flex
        flexDir="column"
        flex="1 0 0"
        gap="42px"
        textAlign="center"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text fontWeight={900}>Connect ETH Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your ETH wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>{buttonText}</Button>
      </Flex>
    </>
  )
}
