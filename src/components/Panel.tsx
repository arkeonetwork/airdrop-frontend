import React from 'react'
import type { BoxProps, ContainerProps } from '@chakra-ui/react'
import { Box, Flex, Container, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

type Props = {
  back?: () => void
  header?: string
  desc?: string
  containerProps?: ContainerProps
} & BoxProps

export const Panel: React.FC<Props> = ({
  containerProps,
  children,
  header,
  desc,
  back,
  ...rest
}) => (
  <Flex
    flex="1"
    flexDir="column"
    justifyContent="center"
    width="650px"
    px={{ base: 4, md: 0 }}
    {...rest}
  >
    <Container
      borderRadius="24px"
      color="white"
      border="1px solid"
      borderColor="grey.200"
      boxShadow="0px 0px 150px 0px rgba(0, 0, 0, 0.25)"
      backgroundColor="grey.300"
      backdropFilter="blur(50px)"
      maxW="auto"
      p="0"
      height="inherit"
      {...containerProps}
    >
      {header && (
        <Box pt="32px">
          <Text
            background="purple"
            backgroundClip="text"
            fontSize="36px"
            fontWeight="900"
            lineHeight="normal"
            letterSpacing="-1.08px"
            pb="12px"
          >
            {header}
          </Text>
          {desc && (
            <Text
              color="white"
              fontSize="18px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="28px"
            >
              {desc}
            </Text>
          )}
        </Box>
      )}
      {children}
    </Container>
  </Flex>
)
