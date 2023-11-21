import { Box, Button } from '@chakra-ui/react';
import { Panel } from '@components/Panel';
import React from 'react';
import { Account } from '@components/Account';
import { useNavigate } from 'react-router-dom';

export const ValidCheck = () => {
  // redirect on invalid info
  const navigate = useNavigate();

  return (
    <Panel header="Congrats!" desc="You are eligible for the Arkeo airdrop!">
      <Box p="32px">
        <Account amount="100" account="0xabcdef6EC7ab88b098defB751B7401B5f6d12345" />
        <Button onClick={() => navigate('/claim')}>Claim Arkeo</Button>
      </Box>
    </Panel>
  );
};
