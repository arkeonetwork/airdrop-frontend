/// <reference path="./types.d.ts" />
import {
  GeneratedType,
  OfflineSigner,
  EncodeObject,
  Registry,
} from '@cosmjs/proto-signing'
import { StdFee } from '@cosmjs/launchpad'
import {
  AminoConverters,
  AminoTypes,
  defaultRegistryTypes,
  SigningStargateClient,
} from '@cosmjs/stargate'
import { Env } from './env'
import { UnionToIntersection, Return, Constructor } from './helpers'
import { Module } from './modules'
import { EventEmitter } from 'events'
import {
  ChainInfo,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from '@keplr-wallet/types'


const defaultFee = {
  amount: [],
  gas: '200000',
}

export const aminoConverters: AminoConverters = {
  '/arkeo.claim.MsgClaimArkeo': {
    aminoType: 'claim/MsgClaimArkeo',
    toAmino: ({ creator }) => ({ creator }), // string → string
    fromAmino: ({ creator }) => ({ creator }), // string → string
  },
  '/arkeo.claim.MsgClaimEth': {
    aminoType: 'claim/ClaimEth',
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

export class IgniteClient extends EventEmitter {
  static plugins: Module[] = []
  env: Env
  signer?: OfflineSigner
  registry: Array<[string, GeneratedType]> = []
  static plugin<T extends Module | Module[]>(plugin: T) {
    const currentPlugins = this.plugins

    class AugmentedClient extends this {
      static plugins = currentPlugins.concat(plugin)
    }

    if (Array.isArray(plugin)) {
      type Extension = UnionToIntersection<Return<T>['module']>
      return AugmentedClient as typeof IgniteClient & Constructor<Extension>
    }

    type Extension = Return<T>['module']
    return AugmentedClient as typeof IgniteClient & Constructor<Extension>
  }

  async signAndBroadcast(msgs: EncodeObject[], fee: StdFee, memo: string) {
    console.log('SIGN AND BROADCAST')
    if (this.signer) {
      const { address } = (await this.signer.getAccounts())[0]
      const signingClient = await SigningStargateClient.connectWithSigner(
        this.env.rpcURL,
        this.signer,
        { registry: new Registry(this.registry) },
      )
      return await signingClient.signAndBroadcast(
        address,
        msgs,
        fee ? fee : defaultFee,
        memo,
      )
    } else {
      throw new Error(' Signer is not present.')
    }
  }

  // async signAndBroadcast(msgs: EncodeObject[], fee: StdFee, memo: string) {
  //   if (this.signer) {
  //     const [{ address }] = await this.signer.getAccounts()

  //     const registry = new Registry([...defaultRegistryTypes, ...this.registry])

  //     const aminoTypes = new AminoTypes(aminoConverters)

  //     const signingClient = await SigningStargateClient.connectWithSigner(
  //       this.env.rpcURL,
  //       this.signer,
  //       {
  //         registry,
  //         aminoTypes,
  //       },
  //     )

  //     return await signingClient.signAndBroadcast(
  //       address,
  //       msgs,
  //       fee || defaultFee,
  //       memo,
  //     )
  //   } else {
  //     throw new Error('Signer is not present.')
  //   }
  // }

  constructor(env: Env, signer?: OfflineSigner) {
    super()
    this.env = env
    this.setMaxListeners(0)
    this.signer = signer
    const classConstructor = this.constructor as typeof IgniteClient
    classConstructor.plugins.forEach((plugin) => {
      const pluginInstance = plugin(this)
      Object.assign(this, pluginInstance.module)
      if (this.registry) {
        this.registry = this.registry.concat(pluginInstance.registry)
      }
    })
  }
  useSigner(signer: OfflineSigner) {
    this.signer = signer
    this.emit('signer-changed', this.signer)
  }
  removeSigner() {
    this.signer = undefined
    this.emit('signer-changed', this.signer)
  }
  async useKeplr(keplrChainInfo: Partial<ChainInfo> = {}) {
    try {
      const queryClient = (
        await import('./cosmos.base.tendermint.v1beta1/module')
      ).queryClient
      const stakingQueryClient = (
        await import('./cosmos.staking.v1beta1/module')
      ).queryClient
      const bankQueryClient = (await import('./cosmos.bank.v1beta1/module'))
        .queryClient

      const stakingqc = stakingQueryClient({ addr: this.env.apiURL })
      const qc = queryClient({ addr: this.env.apiURL })
      const node_info = await (await qc.serviceGetNodeInfo()).data
      const chainId = node_info.default_node_info?.network ?? ''
      const chainName = 'Arkeo Network'
      const staking = await (await stakingqc.queryParams()).data
      const bankqc = bankQueryClient({ addr: this.env.apiURL })
      const tokens = await (await bankqc.queryTotalSupply()).data
      const addrPrefix = this.env.prefix ?? 'arkeo'
      const rpc = this.env.rpcURL
      const rest = this.env.apiURL
      console.log({ rpc, rest })
      let stakeCurrency = {
        coinDenom: staking.params?.bond_denom?.toUpperCase() ?? '',
        coinMinimalDenom: staking.params?.bond_denom ?? '',
        coinDecimals: 8,
      }

      let bip44 = {
        coinType: 118,
      }

      let bech32Config = {
        bech32PrefixAccAddr: addrPrefix,
        bech32PrefixAccPub: addrPrefix + 'pub',
        bech32PrefixValAddr: addrPrefix + 'valoper',
        bech32PrefixValPub: addrPrefix + 'valoperpub',
        bech32PrefixConsAddr: addrPrefix + 'valcons',
        bech32PrefixConsPub: addrPrefix + 'valconspub',
      }

      let currencies =
        tokens.supply?.map((x) => {
          const y = {
            coinDenom: x.denom?.toUpperCase() ?? '',
            coinMinimalDenom: x.denom ?? '',
            coinDecimals: 8,
          }
          return y
        }) ?? []

      let feeCurrencies =
        tokens.supply?.map((x) => {
          const y = {
            coinDenom: x.denom?.toUpperCase() ?? '',
            coinMinimalDenom: x.denom ?? '',
            coinDecimals: 8,
          }
          return y
        }) ?? []

      if (chainId) {
        console.log('SUGGEST CHAIN', {
          chainId,
          chainName,
          rpc,
          rest,
          stakeCurrency,
          bip44,
          bech32Config,
          currencies,
          feeCurrencies,
          ...keplrChainInfo,
        })
        const suggestOptions: ChainInfo = {
          chainId,
          chainName,
          rpc,
          rest,
          stakeCurrency,
          bip44,
          bech32Config,
          currencies,
          feeCurrencies,
          ...keplrChainInfo,
        }
        await window.keplr.experimentalSuggestChain(suggestOptions)

        window.keplr.defaultOptions = {
          sign: {
            preferNoSetFee: true,
            preferNoSetMemo: true,
          },
        }
      }
      await window.keplr.enable(chainId)

      this.signer = window.keplr.getOfflineSigner(chainId)

      this.emit('signer-changed', this.signer)
    } catch (e) {
      throw new Error(
        'Could not load tendermint, staking and bank modules. Please ensure your client loads them to use useKeplr()',
      )
    }
  }
}
