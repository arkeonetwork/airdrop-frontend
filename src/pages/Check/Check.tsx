import { Box, Input, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Panel } from '@components/Panel';
import React from 'react';

export const Check = () => {
  return (
    <Panel header="Claim Arkeo" desc="Paste your Arkeo, Cosmos, or Ethereum address to check eligbility">
      <Box p="32px">
        <Box m="32px">
          <Input variant="filled" placeholder="Paste Address" />
        </Box>
        <Link as={ReactRouterLink} to="valid">
          Learn more about Arkeo
        </Link>
      </Box>
    </Panel>
  );
};
