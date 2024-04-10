import { defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'teal.50',
    fontWeight: 'bold',
    lineHeight: '28px',
    textDecoration: 'none',
    _hover: {
      textDecoration: 'none',
      color: 'teal.100',
    },
  },
  defaultProps: {
    size: 'md',
  },
})
