import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Panel } from '@components/Panel'
import Symbol from '@assets/arkeo-symbol.svg'
import { CircleNumber } from '@components/CircleNumber'
import { Learn } from './components/Learn'
import { Cosmos } from './components/Cosmos'
import { Arkeo } from './components/Arkeo'
import { Eth } from './components/Eth'
import { Claim } from './components/Claim'
import { useConnect } from './ConnectContext'
import { MiddleEllipsis } from '@components/MiddleEllipsis'
import { Congrats } from './components/Congrats'

export const Connect = () => {
  const items = [
    'Learn About Arkeo',
    'Connect Cosmos Account',
    'Connect Arkeo Account',
    'Connect ETH Account',
    'Claim',
  ]
  const {
    state: { step, cosmosAccount, arkeoAccount, ethAccount, totalAmount },
  } = useConnect()

  const displayStep = () => {
    switch (step) {
      case 1:
        return <Learn />
      case 2:
        return <Cosmos />
      case 3:
        return <Arkeo />
      case 4:
        return <Eth />
      case 5:
        return <Claim />
      case 6:
        return <Congrats />
      default:
        console.log('finished')
    }
  }

  const renderListItem = () => {
    return items.map((item, index) => {
      let subText
      switch (index + 1) {
        case 2:
          subText = cosmosAccount
          break
        case 3:
          subText = arkeoAccount
          break
        case 4:
          subText = ethAccount
          break
      }
      return (
        <Box position="relative" key={index}>
          <Flex pb="8px">
            <Box
              display={index + 1 === step ? 'block' : 'none'}
              height="100%"
              width="5px"
              backgroundColor="teal.50"
              position="absolute"
              left="-32px"
              top={!subText ? '-3px' : '0'}
              borderTopRightRadius="5px"
              borderBottomRightRadius="5px"
            />
            <CircleNumber number={index + 1} step={step} />
            <Text
              fontWeight={500}
              lineHeight="24px"
              color={index + 1 === step ? 'white' : 'grey.50'}
            >
              {item}
            </Text>
          </Flex>
          <MiddleEllipsis
            text={subText}
            maxLength={10}
            color="teal.50"
            padding="4px"
            width="fit-content"
            fontSize="12px"
            fontWeight={500}
            lineHeight="16px"
            borderRadius="6px"
            backgroundColor="teal.300"
          />
        </Box>
      )
    })
  }

  return (
    <Panel width="800px">
      <Flex flexDir="row" textAlign="left">
        <Flex flexDir="column" p="32px" gap="24px">
          <Text fontWeight={900}>Claim Airdrop</Text>
          {renderListItem()}
          <Box pt="64px" bottom="0">
            <Text fontSize="14px" fontWeight={500} color="grey.50">
              Available to Claim
            </Text>
            <Flex flexDir="row" alignItems="center">
              <Image w="24px" h="24px" src={Symbol} />
              <Text fontSize="24px" fontWeight="900" pl="5px">
                {totalAmount} ARKEO
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex flexDir="column" flex="1 0 0" backgroundColor="grey.300" p="32px">
          {displayStep()}
        </Flex>
      </Flex>
    </Panel>
  )
}
