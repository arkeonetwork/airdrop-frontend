import BigNumber from 'bignumber.js'
import { precision } from './constants'
import { AminoConverters } from '@cosmjs/stargate'

export const toDecimal = (amount: number | string) =>
  new BigNumber(amount).dividedBy(new BigNumber(10).pow(precision)).toString()

export const aminoConverters: AminoConverters = {
  '/arkeo.claim.MsgClaimArkeo': {
    aminoType: 'arkeo/x/claim/MsgClaimArkeo',
    toAmino: ({ creator }) => ({ creator }), // string → string
    fromAmino: ({ creator }) => ({ creator }), // string → string
  },
  '/arkeo.claim.MsgClaimEth': {
    aminoType: 'arkeo/x/claim/MsgClaimEth',
    toAmino: ({ creator, ethAddress, signature }) => ({
      creator,
      eth_address: ethAddress, // Note the snake_case conversion
      signature,
    }),
    fromAmino: ({ creator, eth_address, signature }) => ({
      creator,
      ethAddress: eth_address, // Convert back to camelCase
      signature,
    }),
  },
}