import { Box, Input, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Panel } from '@components/Panel';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { useClaim } from '@hooks/useClaim';

export const Check = () => {
  const [address, setAddress] = React.useState('0x92E14917A0508Eb56C90C90619f5F9Adbf49f47d');
  const changeAddress = (event: any) => {
    setAddress(event.target.value);
  };

  const { claimRecord } = useClaim({ path: '/claim/claimrecord', address, chain: 1 });

  useEffect(() => {
    (async () => {
      if (ethers.isAddress(address)) {
        console.log('valid address');
        console.log(claimRecord);


      } else {
        console.log('invalid address');
      }
    })();
  }, [address]);

  return (
    <Panel header="Claim Arkeo" desc="Paste your Arkeo, Cosmos, or Ethereum address to check eligbility">
      <Box p="32px">
        <Box my="32px">
          <Input variant="filled" onChange={changeAddress} placeholder="Paste Address" value={address} />
        </Box>
        <Link as={ReactRouterLink}>
          Learn more about Arkeo
        </Link>
      </Box>
    </Panel>
  );
};
