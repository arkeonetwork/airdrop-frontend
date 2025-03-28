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
import { motion } from 'framer-motion'

const MotionFlex = motion(Flex)
const MotionContainer = motion(Container)
const MotionImage = motion(Image)
const MotionButton = motion(Button)

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
  <MotionFlex
    width="100%"
    flex="1"
    my="32px"
    flexDir="column"
    mb="60px"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    {...rest}
  >
    <MotionContainer
      borderRadius="24px"
      border="1px solid"
      borderColor="grey.200"
      boxShadow="0px 0px 150px 0px rgba(0, 0, 0, 0.25)"
      backgroundColor="grey.300"
      backdropFilter="blur(50px)"
      textAlign="left"
      p="16px"
      color="white"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <MotionFlex
        justifyContent="space-between"
        alignItems="flex-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Flex>
          <MiddleEllipsis
            text={account}
            maxLength={10}
            fontSize="16px"
            fontWeight={400}
            pb="16px"
          />
        </Flex>
      </MotionFlex>
      <MotionFlex flexDir="row" alignItems="center" gap={2}>
        <Image w="24px" h="24px" src={Symbol} />
        <Text fontSize="24px" fontWeight="900" textAlign="center">
          {toDecimal(amount)} ARKEO
        </Text>
      </MotionFlex>
      {disconnect && (
        <MotionButton
          onClick={disconnect}
          mt="16px"
          variant="outline"
          isDisabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          Disconnect
        </MotionButton>
      )}
    </MotionContainer>
  </MotionFlex>
)
