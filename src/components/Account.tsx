import React from 'react';
import { Button, Flex, Container, Text, Image, BoxProps } from '@chakra-ui/react';
import { MiddleEllipsis } from './MiddleEllipsis';
import Symbol from '@assets/arkeo-symbol.svg';

type Props = {
  amount: string;
  account: string;
} & BoxProps;

export const Account: React.FC<Props> = ({ amount, account, ...rest }) => (
  <Flex flex="1" flexDir="column" {...rest}>
    <Container
      borderRadius="24px"
      border="1px solid"
      borderColor="grey.200"
      boxShadow="0px 0px 150px 0px rgba(0, 0, 0, 0.25)"
      backgroundColor="grey.300"
      backdropFilter="blur(50px)"
      textAlign="left"
      my="32px"
      p="16px"
      color="white"
    >
      <MiddleEllipsis text={account} maxLength={14} fontSize="16px" fontWeight={500} lineHeight="24px" pb="16px" />
      <Flex flexDir="row" alignItems="center" gap={2}>
        <Image w="40px" h="40px" src={Symbol} />
        <Text fontSize="24px" fontWeight="900" textAlign="center">
          {amount} ARKEO
        </Text>
      </Flex>
    </Container>
  </Flex>
);
