import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const CircleNumber: React.FC<{ number: number; step: number }> = ({ number, step }) => {
  return (
    <Flex alignItems="flex-start">
      <Box
        fontWeight={700}
        color={number > step ? 'grey.50' : 'black'}
        borderRadius="50%"
        width="24px"
        height="24px"
        backgroundColor={number > step ? 'grey.100' : 'teal'}
        mr="8px"
        textAlign="center"
      >
        {number < step ? '✓' : number}
      </Box>
    </Flex>
  );
};
