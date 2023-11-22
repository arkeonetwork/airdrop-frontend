import React from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import EthLogo from '@assets/eth-logo-diamond.svg';
import { useConnect } from '../ConnectContext';
import { ConnectedAccount } from './ConnectedAccount';

type Props = {};

export const Eth: React.FC<Props> = ({}) => {
  const {
    state: { step, ethAccount },
    dispatch,
  } = useConnect();

  const handleClick = () => {
    if (ethAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 });
    } else {
      dispatch({ type: 'SET_ETH_ACCOUNT', payload: '0xabcdef6EC7ab88b098defB751B7401B5f6d12345' });
    }
  };

  const renderWallet = () => {
    if (ethAccount) {
      return <ConnectedAccount width="100%" amount="100" account={ethAccount} type="SET_ETH_ACCOUNT" />;
    }
    return <Image w="150px" h="150px" src={EthLogo} />;
  };

  return (
    <>
      <Flex flexDir="column" flex="1 0 0" gap="42px" textAlign="center" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight={900}>Connect Eth Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Eth wallet to check for eligibility.
          </Text>
        </Box>
        {renderWallet()}
        <Button onClick={handleClick}>{ethAccount ? 'Next' : 'Connect Wallet'}</Button>
      </Flex>
    </>
  );
};
