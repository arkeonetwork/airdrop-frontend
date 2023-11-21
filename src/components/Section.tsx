import React from 'react'
import type { BoxProps, ContainerProps } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'

type Props = {
  containerProps?: ContainerProps
} & BoxProps

export const Section: React.FC<Props> = ({ containerProps, children, ...rest }) => (
  <Box position='relative'  px={{ base: 4, md: 0 }} {...rest}>
    <Container py={{ base: 12, md: 24 }} alignItems='center' maxW='container.xl' {...containerProps}>
      {children}
    </Container>
  </Box>
)