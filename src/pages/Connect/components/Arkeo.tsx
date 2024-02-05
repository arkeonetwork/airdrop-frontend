import React, { useEffect } from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import ArkeoLogo from '@assets/arkeo-symbol-grey.svg'
import { useConnect } from '../ConnectContext'
import { ConnectedAccount } from './ConnectedAccount'
import { useChain } from '@cosmos-kit/react'
import { useGetClaim } from '@hooks/useGetClaim'

type Props = {}
const isTestnet = import.meta.env.VITE_IS_TESTNET

export const Arkeo: React.FC<Props> = ({}) => {
  const chain = isTestnet ? 'arkeonetworktestnet' : 'arkeonetwork'
  const {
    state: { step, arkeoAccount, cosmosAccount },
    dispatch,
  } = useConnect()
  const {
    username,
    address,
    disconnect,
    openView,
  } = useChain(chain)

  const { claimRecord, error } = useGetClaim({
    address: address ?? '',
  })

  useEffect(() => {
    dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: address })
  }, [address])

  const handleClick = () => {
    if (arkeoAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 })
    } else {
      openView()
    }
  }

  const renderWallet = () => {
    if (arkeoAccount) {
      return (
        <ConnectedAccount
          width="100%"
          amount={claimRecord?.amountClaim ?? '0'}
          account={arkeoAccount}
          name={username}
          disconnect={disconnect}
        />
      )
    }
    return <Image w="150px" h="150px" src={ArkeoLogo} />
  }

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
          <Text fontWeight={900}>Connect Arkeo Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Arkeo wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>
          {arkeoAccount ? 'Next' : 'Connect Wallet'}
        </Button>
      </Flex>
    </>
  )
}
