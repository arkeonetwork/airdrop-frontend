import React, { useEffect } from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import CosmosLogo from '@assets/cosmos-atom-logo.svg';
import { useConnect } from '../ConnectContext';
import { ConnectedAccount } from './ConnectedAccount';
import { useChain } from '@cosmos-kit/react';
import { StdFee } from '@cosmjs/stargate';

type Props = {};

export const Cosmos: React.FC<Props> = ({}) => {
  const {
    state: { step, cosmosAccount },
    dispatch,
  } = useConnect();
  const { status, username, address, message, connect, disconnect, openView, sign, isWalletConnected } = useChain('cosmoshub');

  useEffect(() => {
    dispatch({ type: 'SET_COSMOS_ACCOUNT', payload: address });
  }, [address]);

  const fee: StdFee = {
    amount: [
      {
        denom: 'uatom',
        amount: '0',
      },
    ],
    gas: '0',
  };

  const handleClick = () => {
    if (cosmosAccount) {
      dispatch({ type: 'SET_STEP', payload: step + 1 });
    } else {
      console.log({ isWalletConnected });
      if (!isWalletConnected) {
        openView();
      } else {
        console.log('signing');
        sign([{ typeUrl: '/cosmos.bank.v1beta1.MsgSend', value: 'sldkfj' }], fee);
      }
    }
  };

  const renderWallet = () => {
    if (cosmosAccount) {
      return <ConnectedAccount width="100%" amount="100" account={cosmosAccount} disconnect={disconnect} />;
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
