import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Panel } from '@components/Panel';
import Symbol from '@assets/arkeo-symbol.svg';
import { CircleNumber } from '@components/CircleNumber';
import { Learn } from './components/Learn';
import { Cosmos } from './components/Cosmos';
import { Arkeo } from './components/Arkeo';
import { Eth } from './components/Eth';
import { Claim } from './components/Claim';

export const Connect = () => {
  const [step, setStep] = React.useState(1);
  const items = ['Learn About Arkeo', 'Connect Cosmos Account', 'Connect Arkeo Account', 'Connect ETH Account', 'Claim'];

  const displayStep = () => {
    switch (step) {
      case 1:
        return <Learn setStep={setStep} step={step} />;
      case 2:
        return <Cosmos setStep={setStep} step={step} />;
      case 3:
        return <Arkeo setStep={setStep} step={step} />;
      case 4:
        return <Eth setStep={setStep} step={step} />;
      case 5:
        return <Claim setStep={setStep} step={step} />;
      default:
        return <Learn setStep={setStep} step={1} />;
    }
  };

  return (
    <Panel width="800px" height="500px">
      <Flex flexDir="row" textAlign="left" height="100%">
        <Flex flexDir="column" p="32px" gap="24px">
          <Text fontWeight={900}>Claim Airdrop</Text>
          {items.map((item, index) => (
            <Box position="relative" key={index}>
              <Flex>
                <Box
                  display={index + 1 === step ? 'block' : 'none'}
                  height="100%"
                  width="5px"
                  backgroundColor="teal"
                  position="absolute"
                  left="-32px"
                  borderTopRightRadius="5px"
                  borderBottomRightRadius="5px"
                />
                <CircleNumber number={index + 1} step={step} />
                <Text fontWeight={500} lineHeight="24px" color={index + 1 === step ? 'white' : 'grey.50'}>
                  {item}
                </Text>
              </Flex>
            </Box>
          ))}
          <Box position="absolute" pb="32px" bottom="0">
            <Text fontSize="14px" fontWeight={500} color="grey.50">
              Available to Claim
            </Text>
            <Flex flexDir="row" alignItems="center">
              <Image w="24px" h="24px" src={Symbol} />
              <Text fontSize="24px" fontWeight="900" pl="5px">
                0.0 ARKEO
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex flexDir="column" flex="1 0 0" backgroundColor="grey.300" p="32px">
          {displayStep()}
        </Flex>
      </Flex>
    </Panel>
  );
};
