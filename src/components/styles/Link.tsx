import { defineStyleConfig } from '@chakra-ui/react';

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'teal',
    fontWeight: 400,
    lineHeight: '28px',
  },
  defaultProps: {
    size: 'md',
  },
});
