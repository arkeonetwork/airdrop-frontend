import React, { useEffect } from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import ArkeoLogo from '@assets/arkeo-symbol-grey.svg';
import { useConnect } from '../ConnectContext';
import { ConnectedAccount } from './ConnectedAccount';
import { bech32, bech32m } from 'bech32';

type Props = {};

export const Arkeo: React.FC<Props> = ({}) => {
  const {
    state: { step, arkeoAccount, cosmosAccount },
    dispatch,
  } = useConnect();

  const handleClick = () => {
    if (arkeoAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 });
    }
  };

  const renderWallet = () => {
    if (arkeoAccount) {
      return <ConnectedAccount width="100%" amount="100" account={arkeoAccount} disconnect={() => {}} />;
    }
    return <Image w="150px" h="150px" src={ArkeoLogo} />;
  };

  useEffect(() => {
    if (cosmosAccount) {
      const { prefix, words } = bech32.decode(cosmosAccount);
      const address = bech32.encode('arkeo', words);
      dispatch({ type: 'SET_ARKEO_ACCOUNT', payload: address });
    }
  }, [cosmosAccount]);
  
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
