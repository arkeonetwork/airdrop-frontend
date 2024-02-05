import React from 'react'
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react'
import ArkeoLogo from '@assets/arkeo-symbol.svg'
import { useConnect } from '../ConnectContext'
import { toDecimal } from '@utils/functions'

type Props = {}

export const Claim: React.FC<Props> = ({}) => {
  const {
    state: { step, totalClaimAmount },
    dispatch,
  } = useConnect()

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
          <Text pb="8px" fontWeight={900}>
            Claim Arkeo
          </Text>
          <Text fontWeight={500} color="grey.50">
            You have connected all of your wallets, now all you need to do is
            claim your Arkeo airdrop tokens.
          </Text>
        </Box>
        <Flex textAlign="center" flexDir="column" alignItems="center">
          <Image w="64px" h="64px" src={ArkeoLogo} />
          <Text pt="8px" fontSize="24px" lineHeight="normal" fontWeight={900}>
            {toDecimal(totalClaimAmount)} ARKEO
          </Text>
          <Text color="grey.50" lineHeight="normal" fontWeight={400}>
            Available to Claim
          </Text>
        </Flex>
        <Button
          onClick={() => dispatch({ type: 'SET_STEP', payload: step + 1 })}
        >
          Claim
        </Button>
      </Flex>
    </>
  )
}
