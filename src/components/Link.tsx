import { defineStyleConfig } from '@chakra-ui/react';

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'teal',
    fontWeight: 400,
    lineHeight: '28px',
  },

  // The default size and variant values
  defaultProps: {
    size: 'md',
  },
});
