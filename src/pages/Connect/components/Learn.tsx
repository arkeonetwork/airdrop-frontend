import React from 'react'
import { Button, Box, Text, Flex, useToken, Link } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { useConnect } from '../ConnectContext'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)
const MotionText = motion(Text)
const MotionButton = motion(Button)

const nonSelectableText = {
  userSelect: 'none' as const,
  WebkitUserSelect: 'none' as const,
  WebkitTouchCallout: 'none' as const,
}

type Props = {}

export const Learn: React.FC<Props> = ({}) => {
  const [grey200, teal50] = useToken('colors', ['grey.200', 'teal.50'])
  const {
    state: { step },
    dispatch,
  } = useConnect()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
            <MotionBox
              height="100%"
              mt="52px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MotionText
                color="teal.50"
                fontSize="16px"
                fontWeight={700}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={nonSelectableText}
              >
                Learn About Arkeo
              </MotionText>
              <MotionText
                fontSize="24px"
                fontWeight={400}
                pb="32px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={nonSelectableText}
              >
                What is Arkeo?
              </MotionText>
              <MotionText
                fontSize="16px"
                fontWeight={400}
                color="grey.50"
                textAlign="left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={nonSelectableText}
              >
                ARKEO is the native token of the Arkeo network. Arkeo is a
                purpose built blockchain built on top of the cosmos SDK that is
                the foundation of a marketplace for decentralized and indexed
                blockchain data. ARKEO is being airdropped according to the
                Arkeo airdrop spec{' '}
                <Link color="blue.200" target="_blank" href="https://arkeo.network">
                  (link here)
                </Link>{' '}
                and a wide range of crypto users are eligible for the airdrop
                including FOX holders, ATOM, OSMO, and RUNE holders.
              </MotionText>
            </MotionBox>
            <MotionBox
              height="100%"
              mt="52px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MotionText
                color="teal.50"
                fontSize="16px"
                fontWeight={700}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={nonSelectableText}
              >
                Learn About Arkeo
              </MotionText>
              <Text
                fontSize="24px"
                fontWeight={400}
                pb="32px"
                style={nonSelectableText}
              >
                How to claim?
              </Text>
              <Text
                fontSize="16px"
                fontWeight={400}
                color="grey.50"
                textAlign="left"
                style={nonSelectableText}
              >
                You can claim and check your eligibility for the ARKEO airdrop
                by connecting your wallet(s). The process is slightly different
                for different types of token holders: <br />
                For FOX holders this means connecting your EVM compatible wallet
                (such as metamask or rabby) and signing a message to assign your
                airdrop to an ARKEO wallet address. You will need to connect
                Keplr to get your Arkeo address in order to receive the airdrop.{' '}
                <br />
                For ATOM/OSMO holders you simply need to connect your associated
                Keplr wallet in order to claim and follow the claim steps.{' '}
                <br />
                For eligible RUNE holders and LPs you will need to connect your
                THORChain compatible wallet and sign a message in order to
                assign your claim to an Arkeo address using Keplr.
              </Text>
            </MotionBox>
            <MotionBox
              height="100%"
              mt="52px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MotionText
                color="teal.50"
                fontSize="16px"
                fontWeight={700}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={nonSelectableText}
              >
                Learn About Arkeo
              </MotionText>
              <Text
                fontSize="24px"
                fontWeight={400}
                pb="32px"
                style={nonSelectableText}
              >
                What can you do with ARKEO?
              </Text>
              <Text
                fontSize="16px"
                fontWeight={400}
                color="grey.50"
                textAlign="left"
                style={nonSelectableText}
              >
                ARKEO will be both the main governance token for the Arkeo
                network as well as a utility token used to pay for decentralized
                node data over the Arkeo network. While node data can be paid
                for with any IBC supported token, many users will want to pay
                with Arkeo at genesis. ARKEO is also used to stake and support
                the security of the Arkeo blockchain, by staking your ARKEO with
                a validator you will receive ARKEO staking rewards from the
                reserve.
              </Text>
            </MotionBox>
          </Carousel>
          <MotionButton
            mt={5}
            onClick={() => dispatch({ type: 'SET_STEP', payload: step + 1 })}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Next
          </MotionButton>
        </Flex>
      </motion.div>
    </AnimatePresence>
  )
}
