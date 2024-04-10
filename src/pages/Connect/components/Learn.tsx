import React from 'react'
import { Button, Box, Text, Flex, useToken } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { useConnect } from '../ConnectContext'

type Props = {}

export const Learn: React.FC<Props> = ({}) => {
  const [grey200, teal50] = useToken('colors', ['grey.200', 'teal.50'])
  const {
    state: { step },
    dispatch,
  } = useConnect()

  return (
    <Flex flexDir="column" justifyContent="space-between" height="100%">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={false}
        infiniteLoop={true}
        interval={5000}
        emulateTouch={true}
        renderIndicator={(
          clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
          isSelected: boolean,
          index: number,
          label: string,
        ) => {
          const style = {
            display: 'inline-block',
            width: '100px',
            height: '5px',
            backgroundColor: grey200,
            marginLeft: '5px',
            marginRight: '5px',
            cursor: 'pointer',
          }
          if (isSelected) {
            style.backgroundColor = teal50
          }
          return <li onClick={clickHandler} style={style} />
        }}
      >
        <Box height="100%" mt="52px">
          <Text color="teal.50" fontSize="16px" fontWeight={700}>
            Learn About Arkeo
          </Text>
          <Text fontSize="24px" fontWeight={400} pb="42px">
            What is Arkeo?
          </Text>
          <Text
            fontSize="16px"
            fontWeight={400}
            color="grey.50"
            textAlign="left"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>
        <Box height="100%" mt="52px">
          <p>More Stuff</p>
        </Box>
        <Box height="100%" mt="52px">
          <p>Even More Stuff</p>
        </Box>
      </Carousel>
      <Button mt={5} onClick={() => dispatch({ type: 'SET_STEP', payload: step + 1 })}>
        Next
      </Button>
    </Flex>
  )
}
