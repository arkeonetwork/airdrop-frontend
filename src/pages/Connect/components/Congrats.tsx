import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { useConnect } from '../ConnectContext';
import Success from '@assets/success.svg';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {};

export const Congrats: React.FC<Props> = ({}) => {
  const {
    state: { step, arkeoAccount },
    dispatch,
  } = useConnect();

  const handleClick = () => {
    if (arkeoAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 });
    } else {
      dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: 'arkeof6EC7ab88b098defB751B7401B5f6d12345' });
    }
  };

  return (
    <>
      <Flex flexDir="column" flex="1 0 0" justifyContent="space-between">
        <Flex flexDir="column" alignItems="center" textAlign="center">
          <Image w="64px" h="64px" src={Success} />
          <Text fontWeight={900}>Congrats!</Text>
          <Text fontWeight={500}>You have successfully claimed 300 ARKEO. To unlock more you can do the following activities.</Text>
        </Flex>
        <Box>
          <Text fontWeight={700} mb="16px">
            Airdrop Activities
          </Text>
          <Flex justifyContent="space-between" backgroundColor="grey.200" p="8px 16px" borderRadius="12px" mb="16px">
            <Text fontWeight={400}>Stake your Arkeo</Text>
            <Flex>
              <Text>100 ARKEO</Text>
              <ArrowForwardIcon width="24px" height="24px" padding="4px" color="grey.50" />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" backgroundColor="grey.200" p="8px 16px" borderRadius="12px">
            <Text>Vote on Proposal</Text>
            <Flex>
              <Text>100 ARKEO</Text>
              <ArrowForwardIcon width="24px" height="24px" padding="4px" color="grey.50" />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
