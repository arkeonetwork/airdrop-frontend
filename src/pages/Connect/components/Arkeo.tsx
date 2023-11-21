import React from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import ArkeoLogo from '@assets/arkeo-symbol-grey.svg';
import { useConnect } from '../ConnectContext';
import { ConnectedAccount } from '@components/ConnectedAccount';

type Props = {};

export const Arkeo: React.FC<Props> = ({}) => {
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

  const renderWallet = () => {
    if (arkeoAccount) {
      return <ConnectedAccount width="100%" amount="100" account={arkeoAccount} />;
    }
    return <Image w="150px" h="150px" src={ArkeoLogo} />;
  };

  return (
    <>
      <Flex flexDir="column" flex="1 0 0" gap="42px" textAlign="center" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight={900}>Connect Arkeo Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Arkeo wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>{arkeoAccount ? 'Next' : 'Connect Wallet'}</Button>
      </Flex>
    </>
  );
};
