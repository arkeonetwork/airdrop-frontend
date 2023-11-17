import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      color: 'white',
    },
  },
  variants: {
    filled: {
      field: {
        backgroundColor: 'grey.200',
        borderRadius: '6px',
        _hover: {
          backgroundColor: 'grey.100',
        },
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'filled',
  },
});
