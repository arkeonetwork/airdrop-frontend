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
          <Text fontSize="24px" fontWeight={400} pb="32px">
            What is Arkeo?
          </Text>
          <Text
            fontSize="16px"
            fontWeight={400}
            color="grey.50"
            textAlign="left"
          >
            ARKEO is the native token of the Arkeo network. Arkeo is a purpose
            built blockchain built on top of the cosmos SDK that is the
            foundation of a marketplace for decentralized and indexed blockchain
            data. ARKEO is being airdropped according to the Arkeo airdrop spec
            (link here) and a wide range of crypto users are eligible for the
            airdrop including FOX holders, ATOM, OSMO, and RUNE holders.
          </Text>
        </Box>
        <Box height="100%" mt="52px">
          <Text color="teal.50" fontSize="16px" fontWeight={700}>
            Learn About Arkeo
          </Text>
          <Text fontSize="24px" fontWeight={400} pb="32px">
            How to claim?
          </Text>
          <Text
            fontSize="16px"
            fontWeight={400}
            color="grey.50"
            textAlign="left"
          >
            You can claim and check your eligibility for the ARKEO airdrop by
            connecting your wallet(s). The process is slightly different for
            different types of token holders: <br />
            For FOX holders this means connecting your EVM compatible wallet
            (such as metamask or rabby) and signing a message to assign your
            airdrop to an ARKEO wallet address. You will need to connect Keplr
            to get your Arkeo address in order to receive the airdrop. <br />
            For ATOM/OSMO holders you simply need to connect your associated
            Keplr wallet in order to claim and follow the claim steps. <br />
            For eligible RUNE holders and LPs you will need to connect your
            THORChain compatible wallet and sign a message in order to assign
            your claim to an Arkeo address using Keplr.
          </Text>
        </Box>
        <Box height="100%" mt="52px">
          <Text color="teal.50" fontSize="16px" fontWeight={700}>
            Learn About Arkeo
          </Text>
          <Text fontSize="24px" fontWeight={400} pb="32px">
            What can you do with ARKEO?
          </Text>
          <Text
            fontSize="16px"
            fontWeight={400}
            color="grey.50"
            textAlign="left"
          >
            ARKEO will be both the main governance token for the Arkeo network
            as well as a utility token used to pay for decentralized node data
            over the Arkeo network. While node data can be paid for with any IBC
            supported token, many users will want to pay with Arkeo at genesis.
            ARKEO is also used to stake and support the security of the Arkeo
            blockchain, by staking your ARKEO with a validator you will receive
            ARKEO staking rewards from the reserve.
          </Text>
        </Box>
      </Carousel>
      <Button
        mt={5}
        onClick={() => dispatch({ type: 'SET_STEP', payload: step + 1 })}
      >
        Next
      </Button>
    </Flex>
  )
}
