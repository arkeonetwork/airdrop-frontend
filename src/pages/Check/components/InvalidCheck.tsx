import { Button } from '@chakra-ui/react';
import { Panel } from '@components/Panel';
import React from 'react';
import { Account } from '@components/Account';

export const InvalidCheck = () => {
  // redirect on invalid info
  return (
    <Panel header="Sorry!" desc="You are not eligible for the Arkeo airdrop!">
      <Account amount="0" account="0xabcdef6EC7ab88b098defB751B7401B5f6d12345" />
      <Button disabled>Claim Arkeo</Button>
    </Panel>
  );
};
