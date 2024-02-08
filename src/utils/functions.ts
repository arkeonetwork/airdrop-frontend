import BigNumber from 'bignumber.js'
import { precision } from './constants'

export const toDecimal = (amount: number | string) =>
  new BigNumber(amount).dividedBy(new BigNumber(10).pow(precision)).toString()
