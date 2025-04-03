import React, { useEffect, useState } from 'react'
import { Box, Text, Image, Flex, Button, Link } from '@chakra-ui/react'
import { useConnect } from '../ConnectContext'
import Success from '@assets/success.svg'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { toDecimal } from '@utils/functions'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from '@hooks/useWindowSize'

const MotionFlex = motion(Flex)
const MotionImage = motion(Image)
const MotionBox = motion(Box)

type Props = {}

export const Congrats: React.FC<Props> = ({}) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const { width, height } = useWindowSize()
  const {
    state: {
      arkeoInfo: {
        claimableAmount: arkeoAmountClaim,
        amountDelegate: arkeoAmountDelegate,
        amountVote: arkeoAmountVote,
      },
      thorInfo: {
        claimableAmount: thorAmountClaim,
        amountDelegate: thorAmountDelegate,
        amountVote: thorAmountVote,
      },
      ethInfo: {
        claimableAmount: ethAmountClaim,
        amountDelegate: ethAmountDelegate,
        amountVote: ethAmountVote,
      },
    },
    dispatch,
  } = useConnect()
  const totalClaimAmount = arkeoAmountClaim + thorAmountClaim + ethAmountClaim
  const totalDelegateAmount =
    arkeoAmountDelegate + thorAmountDelegate + ethAmountDelegate
  const totalVoteAmount = arkeoAmountVote + thorAmountVote + ethAmountVote

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <MotionFlex
        flexDir="column"
        flex="1 0 0"
        justifyContent="space-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <MotionFlex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MotionImage
            w="64px"
            h="64px"
            src={Success}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.6, 0.8, 1],
              delay: 0.3,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Text fontWeight={900}>Congrats!</Text>
            <Text fontWeight={500}>
              You have successfully claimed {toDecimal(arkeoAmountClaim)} ARKEO.
              Please stake and vote on the Arkeo network to claim the rest of
              your airdrop.
            </Text>
          </motion.div>
        </MotionFlex>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Text fontWeight={700} mb="16px">
            Airdrop Activities
          </Text>
          <Link
            href="https://exp.stakevillage.net/arkeo-mainnet"
            target="_blank"
          >
            <MotionFlex
              justifyContent="space-between"
              backgroundColor="grey.200"
              p="8px 16px"
              borderRadius="12px"
              mb="16px"
              _hover={{ backgroundColor: 'grey.150' }}
              transition={{ duration: 0.2 }}
              cursor="pointer"
            >
              <Text>{toDecimal(arkeoAmountClaim)} ARKEO</Text>
              <Text>Stake your Arkeo</Text>
              <Flex>
                <ArrowForwardIcon
                  width="24px"
                  height="24px"
                  padding="4px"
                  color="grey.50"
                />
              </Flex>
            </MotionFlex>
          </Link>
          <Link
            href="https://exp.stakevillage.net/arkeo-mainnet/gov"
            target="_blank"
          >
            <MotionFlex
              justifyContent="space-between"
              backgroundColor="grey.200"
              p="8px 16px"
              borderRadius="12px"
              _hover={{ backgroundColor: 'grey.150' }}
              transition={{ duration: 0.2 }}
              cursor="pointer"
            >
              <Text>Vote on Proposal</Text>
              <Flex>
                <Text>{toDecimal(arkeoAmountClaim)} ARKEO</Text>
                <ArrowForwardIcon
                  width="24px"
                  height="24px"
                  padding="4px"
                  color="grey.50"
                />
              </Flex>
            </MotionFlex>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button mt={6} onClick={() => dispatch({ type: 'RESET' })}>
              Claim Again
            </Button>
          </motion.div>
        </MotionBox>
      </MotionFlex>
    </>
  )
}
