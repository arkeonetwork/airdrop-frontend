import { Box, Button, Input, Link, Text } from '@chakra-ui/react';
import { Panel } from '../../../components/Panel';
import React from 'react';
import { Account } from '../../../components/Account';

export const ValidCheck = () => {
  // redirect on invalid info
  return (
    <Panel header="Congrats!" desc="You are eligible for the Arkeo airdrop!">
      <Account/>
      <Button>Claim Arkeo</Button>
    </Panel>
  );
};
