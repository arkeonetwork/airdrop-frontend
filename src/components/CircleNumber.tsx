import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const CircleNumber: React.FC<{ number: number; step: number, skipped: boolean }> = ({ number, step, skipped }) => {
  return (
    <Flex alignItems="flex-start">
      <Box
        fontWeight={700}
        color={number > step ? 'grey.50' : 'black'}
        borderRadius="50%"
        width="24px"
        height="24px"
        backgroundColor={skipped || number > step ? 'grey.100' : 'teal.50'}
        mr="8px"
        textAlign="center"
      >
        {skipped ? '-' : number < step ? '✓' : number}
      </Box>
    </Flex>
  );
};
