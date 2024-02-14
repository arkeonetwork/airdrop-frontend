import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    color: 'black',
    backgroundColor: 'teal.50',
    width: '100%',
    borderRadius: '8px',
    _hover: {
      backgroundColor: 'teal.100'
    }
  },
  variants: {
    solid: {
      backgroundColor: 'teal.50',
      color: 'black',
    },
    outline: {
      border: '1px solid',
      borderColor: 'grey.150'
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'teal.50',
  },
});
