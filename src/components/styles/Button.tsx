import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    color: 'black',
    backgroundColor: 'teal',
    width: '100%',
    borderRadius: '8px',
  },
  variants: {
    solid: {
      backgroundColor: 'teal',
      color: 'black',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'teal',
  },
});
