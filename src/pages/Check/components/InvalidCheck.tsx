import { Box, Input, Link, Text } from '@chakra-ui/react';
import { Panel } from '../../../components/Panel';
import React from 'react';

export const InvalidCheck = () => {
  return (
    <Panel header="No Airdrop" desc="This account is not eligible for the Arkeo airdrop.">
      <Box my="44px">
        <Input variant="filled" placeholder="Paste Address" />
      </Box>
      <Link>Learn more about Arkeo</Link>
    </Panel>
  );
};
