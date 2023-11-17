import { Box, Input, Link, Text } from '@chakra-ui/react';
import { Panel } from '../../components/Panel';
import React from 'react';

export const Check = () => {
  return (
    <Panel header="Claim Arkeo" desc="Paste your Arkeo, Cosmos, or Ethereum address to check eligbility">
      <Box my="44px">
        <Input variant="filled" placeholder="Paste Address" />
      </Box>
      <Link>Learn more about Arkeo</Link>
    </Panel>
  );
};
