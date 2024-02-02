import React, { useEffect } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import CosmosLogo from '@assets/cosmos-atom-logo.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useSignMessage, useDisconnect, useAccount } from 'wagmi'
import { useGetClaim } from '@hooks/useGetClaim'

type Props = {}

export const Eth: React.FC<Props> = ({}) => {
  const {
    state: { step, ethAccount },
    dispatch,
  } = useConnect()
  const { open } = useWeb3Modal()
  const { data, isError, isLoading, isSuccess, signMessage, status, reset } =
    useSignMessage({
      message: 'ETH airdrop eligibility check',
    })
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const { claimRecord, error } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    if (isSuccess && address) {
      dispatch({ type: 'SET_ETH_ACCOUNT', payload: address })
    }
  }, [data, isError, isLoading, isSuccess])

  const handleClick = () => {
    if (ethAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      if (address) {
        signMessage()
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
          amount={claimRecord?.total ?? '0'}
          account={ethAccount}
          disconnect={() => {
            disconnect()
            dispatch({ type: 'SET_ETH_ACCOUNT', payload: undefined })
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
