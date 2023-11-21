import React from 'react';
import { Button, Box, Text, Image, Flex } from '@chakra-ui/react';
import EthLogo from '@assets/eth-logo-diamond.svg';

type Props = {
  setStep: (step: number) => void;
  step: number;
};

export const Eth: React.FC<Props> = ({ setStep, step }) => {
  return (
    <>
      <Flex flexDir="column" flex="1 0 0" gap="42px" textAlign="center" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight={900}>Connect Arkeo Account</Text>
          <Text fontWeight={500} color="grey.50">
            Connect your Arkeo wallet to check for eligibility.
          </Text>
        </Box>
        <Image w="150px" h="150px" src={EthLogo} />
        <Button onClick={() => setStep(step + 1)}>Connect Wallet</Button>
      </Flex>
    </>
  );
};
