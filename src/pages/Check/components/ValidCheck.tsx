import { Box, Button, Input, Link, Text } from '@chakra-ui/react';
import { Panel } from '../../../components/Panel';
import React from 'react';
import { Account } from '../../../components/Account';
import { useNavigate } from 'react-router-dom';

export const ValidCheck = () => {
  // redirect on invalid info
  const navigate = useNavigate();

  return (
    <Panel header="Congrats!" desc="You are eligible for the Arkeo airdrop!">
      <Account amount="100" account="0x111fffeeeeaaabbccc" />
      <Button onClick={() => navigate('/claim')}>Claim Arkeo</Button>
    </Panel>
  );
};
