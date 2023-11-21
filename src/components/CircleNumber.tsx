import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const CircleNumber: React.FC<{ number: string }> = ({ number }) => {
  return (
    <Flex alignItems="flex-start">
      <Box fontWeight={700} color="black" borderRadius="50%" width="24px" height="24px" backgroundColor="teal" mr="8px" textAlign="center">
        {number}
      </Box>
    </Flex>
  );
};
