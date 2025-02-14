import React from 'react'
import {
  Button,
  Flex,
  Container,
  Text,
  Image,
  BoxProps,
} from '@chakra-ui/react'
import { MiddleEllipsis } from '../../../components/MiddleEllipsis'
import Symbol from '@assets/arkeo-symbol.svg'
import { toDecimal } from '@utils/functions'

type Props = {
  amount: string
  account: string
  disconnect?: () => void
  name?: string
  loading?: boolean
} & BoxProps

export const ConnectedAccount: React.FC<Props> = ({
  amount,
  account,
  name,
  disconnect,
  loading,
  ...rest
}) => (
  <Flex width="100%" flex="1" my="32px" flexDir="column" {...rest}>
    <Container
      borderRadius="24px"
      border="1px solid"
      borderColor="grey.200"
      boxShadow="0px 0px 150px 0px rgba(0, 0, 0, 0.25)"
      backgroundColor="grey.300"
      backdropFilter="blur(50px)"
      textAlign="left"
      p="16px"
      color="white"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex>
          <MiddleEllipsis
            text={account}
            maxLength={10}
            fontSize="16px"
            fontWeight={400}
            pb="16px"
          />
        </Flex>
      </Flex>
      <Flex flexDir="row" alignItems="center" gap={2}>
        <Image w="24px" h="24px" src={Symbol} />
        <Text fontSize="24px" fontWeight="900" textAlign="center">
          {toDecimal(amount)} ARKEO
        </Text>
      </Flex>
      {disconnect && (
        <Button onClick={disconnect} mt="16px" variant="outline" isDisabled={loading}>
          Disconnect
        </Button>
      )}
    </Container>
  </Flex>
)
