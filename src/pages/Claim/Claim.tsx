import React, { useState } from 'react';
import { Box, Button, Flex, Image, Link, ListItem, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Panel } from '../../components/Panel';
import { Carousel } from 'react-responsive-carousel';
import { useToken } from '@chakra-ui/react';
import Symbol from '../../assets/arkeo-symbol.svg';

export const Claim = () => {
  const [grey200, teal] = useToken('colors', ['grey.200', 'teal']);

  return (
    <Panel width='800px'>
      <Flex flexDir="row" textAlign="left">
        <Flex flexDir="column" flex="1" p="32px">
          <Text pb="24px" fontWeight={900}>
            Claim Airdrop
          </Text>
          <Text fontWeight={500} lineHeight="24px">
            Learn About Arkeo
          </Text>
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
        <Flex flexDir="column" flex="2" backgroundColor="grey.300" p="32px">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={true}
            autoPlay={false}
            infiniteLoop={true}
            interval={5000}
            emulateTouch={true}
            renderIndicator={(
              clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
              isSelected: boolean,
              index: number,
              label: string
            ) => {
              const style = {
                display: 'inline-block',
                width: '100px',
                height: '5px',
                backgroundColor: grey200,
                marginLeft: '5px',
                marginRight: '5px',
                cursor: 'pointer',
              };
              if (isSelected) {
                style.backgroundColor = teal;
              }
              return <li onClick={clickHandler} style={style} />;
            }}
          >
            <Box height="100%" mt="52px">
              <Text color="teal" fontSize="16px" fontWeight={700}>
                Learn About Arkeo
              </Text>
              <Text fontSize="24px" fontWeight={400} pb="42px">
                What is Arkeo?
              </Text>
              <Text fontSize="16px" fontWeight={400} color="grey.50" textAlign="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Box>
            <Box height="100%" mt="52px">
              <p>More Stuff</p>
            </Box>
            <Box height="100%" mt="52px">
              <p>Even More Stuff</p>
            </Box>
          </Carousel>
          <Button onClick={() => {}}>Next</Button>
        </Flex>
      </Flex>
    </Panel>
  );
};
