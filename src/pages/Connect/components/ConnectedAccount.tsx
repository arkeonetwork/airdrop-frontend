import React from 'react';
import { Button, Flex, Container, Text, Image, BoxProps } from '@chakra-ui/react';
import { MiddleEllipsis } from '../../../components/MiddleEllipsis';
import Symbol from '@assets/arkeo-symbol.svg';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useConnect } from '../ConnectContext';

type Props = {
  amount: string;
  account: string;
  type: string;
} & BoxProps;

export const ConnectedAccount: React.FC<Props> = ({ amount, account, type, ...rest }) => {
  const {
    dispatch,
  } = useConnect();
  
  const disconnect = () => {
    dispatch({ type, payload: undefined });
  };

  return (
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
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex>
            <MiddleEllipsis text={account} maxLength={10} fontSize="16px" fontWeight={400} pb="16px" />
            <Text pl="4px">will receive</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Text>Account #0</Text>
            <ChevronDownIcon width="24px" height="24px" backgroundColor="grey.100" borderRadius="4px" padding="4px" color="grey.50" />
          </Flex>
        </Flex>
        <Flex flexDir="row" alignItems="center" gap={2}>
          <Image w="24px" h="24px" src={Symbol} />
          <Text fontSize="24px" fontWeight="900" textAlign="center">
            {amount} ARKEO
          </Text>
        </Flex>
        <Button onClick={disconnect} mt="16px" variant="outline">
          Disconnect
        </Button>
      </Container>
    </Flex>
  );
};
