import React from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import CosmosLogo from '@assets/cosmos-atom-logo.svg';
import { useConnect } from '../ConnectContext';
import { ConnectedAccount } from '@components/ConnectedAccount';

type Props = {};

export const Cosmos: React.FC<Props> = ({}) => {
  const {
    state: { step, cosmosAccount },
    dispatch,
  } = useConnect();

  const handleClick = () => {
    if (cosmosAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 });
    } else {
      dispatch({ type: 'SET_COSMOS_ACCOUNT', payload: 'cosmosf6EC7ab88b098defB751B7401B5f6d12345' });
    }
  };

  const renderWallet = () => {
    if (cosmosAccount) {
      return <ConnectedAccount width="100%" amount="100" account={cosmosAccount} />;
    }
    return <Image w="150px" h="150px" src={CosmosLogo} />;
  };

  return (
    <>
      <Flex flexDir="column" flex="1 0 0" gap="42px" textAlign="center" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight={900}>Connect Cosmos Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Cosmos wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>{cosmosAccount ? 'Next' : 'Connect Wallet'}</Button>
      </Flex>
    </>
  );
};
