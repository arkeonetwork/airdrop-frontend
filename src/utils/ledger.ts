import {
  ChainRestAuthApi,
  BaseAccount,
  createTransaction,
  createWeb3Extension,
  SIGN_AMINO,
  TxGrpcApi,
  createTxRawEIP712,
  ChainRestTendermintApi,
  getGasPriceBasedOnMessage,
  getEip712TypedData,
  Msgs,
} from '@injectivelabs/sdk-ts'
import {
  getNetworkEndpoints,
  NetworkEndpoints,
  Network,
} from '@injectivelabs/networks'
import {
  GeneralException,
  TransactionException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'
import { BigNumberInBase, getStdFee } from '@injectivelabs/utils'

export interface Options {
  ethereumChainId: number /* 1 for Injective mainnet, 5 for Injective testnet */
  chainId: string /* Injective chain id */
  endpoints: NetworkEndpoints /* can be fetched from @injectivelabs/networks based on the Network */
}

export interface Transaction {
  memo?: string
  injectiveAddress?: string
  msgs: Msgs | Msgs[]

  // In case we manually want to set gas options
  gas?: {
    gasPrice?: string
    gas?: number /** gas limit */
    feePayer?: string
    granter?: string
  }
}

/** Converting EIP712 tx details to Cosmos Std Sign Doc */
export const createEip712StdSignDoc = ({
  memo,
  chainId,
  accountNumber,
  timeoutHeight,
  sequence,
  gas,
  msgs,
}: {
  memo?: string
  chainId: string
  timeoutHeight?: string
  accountNumber: number
  sequence: number
  gas?: string
  msgs: Msgs[]
}) => ({
  chain_id: chainId,
  timeout_height: timeoutHeight || '',
  account_number: accountNumber.toString(),
  sequence: sequence.toString(),
  fee: getStdFee({ gas }),
  msgs: msgs.map((m) => m.toEip712()),
  memo: memo || '',
})

/**
 * We use this method only when we want to broadcast a transaction using Ledger on Keplr for Injective
 *
 * Note: Gas estimation not available
 * @param tx the transaction that needs to be broadcasted
 */
export const experimentalBroadcastKeplrWithLedger = async (
  tx: Transaction,
  options: Options,
) => {
  const { endpoints, chainId, ethereumChainId } = options
  const msgs = Array.isArray(tx.msgs) ? tx.msgs : [tx.msgs]
  const DEFAULT_BLOCK_TIMEOUT_HEIGHT = 60

  /**
   * You choose to perform a check if
   * the user is indeed connected with Ledger + Keplr
   */
  if (false) {
    throw new GeneralException(
      new Error(
        'This method can only be used when Keplr is connected with Ledger',
      ),
    )
  }

  /** Account Details * */
  const chainRestAuthApi = new ChainRestAuthApi(endpoints.rest)
  const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
    tx.injectiveAddress || '',
  )
  const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse)
  const accountDetails = baseAccount.toAccountDetails()

  /** Block Details */
  const chainRestTendermintApi = new ChainRestTendermintApi(endpoints.rest)
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock()
  const latestHeight = latestBlock.header.height
  const timeoutHeight = new BigNumberInBase(latestHeight).plus(
    DEFAULT_BLOCK_TIMEOUT_HEIGHT,
  )

  const key = await window.keplr.getKey(chainId)
  const pubKey = Buffer.from(key.pubKey).toString('base64')
  const gas = (tx.gas?.gas || getGasPriceBasedOnMessage(msgs)).toString()

  /** EIP712 for signing on Ethereum wallets */
  const eip712TypedData = getEip712TypedData({
    msgs,
    fee: getStdFee({ ...tx.gas, gas }),
    tx: {
      memo: tx.memo,
      accountNumber: accountDetails.accountNumber.toString(),
      sequence: accountDetails.sequence.toString(),
      timeoutHeight: timeoutHeight.toFixed(),
      chainId,
    },
    ethereumChainId,
  })

  const aminoSignResponse =
    await window.keplr.experimentalSignEIP712CosmosTx_v0(
      chainId,
      tx.injectiveAddress || '',
      eip712TypedData,
      createEip712StdSignDoc({
        ...tx,
        ...baseAccount,
        msgs,
        chainId,
        gas: gas || tx.gas?.gas?.toString(),
        timeoutHeight: timeoutHeight.toFixed(),
      }),
    )

  /**
   * Create TxRaw from the signed tx that we
   * get as a response in case the user changed the fee/memo
   * on the Keplr popup
   */
  const { txRaw } = createTransaction({
    pubKey,
    message: msgs,
    memo: aminoSignResponse.signed.memo,
    signMode: SIGN_AMINO,
    fee: aminoSignResponse.signed.fee,
    sequence: parseInt(aminoSignResponse.signed.sequence, 10),
    timeoutHeight: parseInt(
      (aminoSignResponse.signed as any).timeout_height,
      10,
    ),
    accountNumber: parseInt(aminoSignResponse.signed.account_number, 10),
    chainId,
  })

  /** Preparing the transaction for client broadcasting */
  const web3Extension = createWeb3Extension({
    ethereumChainId,
  })
  const txRawEip712 = createTxRawEIP712(txRaw, web3Extension)

  /** Append Signatures */
  const signatureBuff = new Uint8Array(
    Buffer.from(aminoSignResponse.signature.signature, 'base64'),
  )
  txRawEip712.signatures = [signatureBuff]

  /** Broadcast the transaction */
  const response = await new TxGrpcApi(endpoints.grpc).broadcast(txRawEip712)

  if (response.code !== 0) {
    throw new TransactionException(new Error(response.rawLog), {
      code: UnspecifiedErrorCode,
      contextCode: response.code,
      contextModule: response.codespace,
    })
  }

  return response
}
