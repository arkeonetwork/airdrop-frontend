import { Box, useRadio } from '@chakra-ui/react'

export const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontWeight="bold"
        color="grey.50"
        _checked={{
          bg: 'teal.200',
          color: 'white',
          borderColor: 'teal.50',
        }}
        _hover={input.checked ? {} : { bg: 'grey.100' }}
        px={8}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
