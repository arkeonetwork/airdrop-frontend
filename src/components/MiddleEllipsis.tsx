import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'

type Props = {
  text?: string
  maxLength: number
} & TextProps

export const MiddleEllipsis: React.FC<Props> = ({
  text,
  maxLength,
  ...rest
}) => {
  if (!text) return <></>

  if (text.length <= maxLength) {
    return <Text {...rest}>{text}</Text>
  }

  const firstHalf = text.slice(0, maxLength / 2 + 7)
  const secondHalf = text.slice(-maxLength / 2)

  return (
    <Text {...rest}>
      {firstHalf}
      {'...'}
      {secondHalf}
    </Text>
  )
}
