import { Box, Button, Input, Link, Text } from '@chakra-ui/react';
import { Panel } from '../../../components/Panel';
import React from 'react';
import { Account } from '../../../components/Account';

export const ValidCheck = () => {
  // redirect on invalid info
  return (
    <Panel header="Sorry!" desc="You are not eligible for the Arkeo airdrop!">
      <Account amount="0" account="0x111fffeeeeaaabbccc" />
      <Button disabled>Claim Arkeo</Button>
    </Panel>
  );
};
