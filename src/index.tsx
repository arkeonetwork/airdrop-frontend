import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from './theme.ts'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { mainnet } from 'viem/chains'
import { ChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets } from '@cosmos-kit/keplr-extension'
import { Chain, AssetList } from '@chain-registry/types'
import '@interchain-ui/react/globalStyles'
import '@interchain-ui/react/styles'

console.log("import.meta.env", import.meta.env)
console.log("process.env", process.env)
console.log("VITE_WALLET_CONNECT_ID", import.meta.env.VITE_WALLET_CONNECT_ID)
console.log("VITE_ARKEO_ENDPOINT_REST", import.meta.env.VITE_ARKEO_ENDPOINT_REST)
console.log("VITE_ARKEO_ENDPOINT_RPC", import.meta.env.VITE_ARKEO_ENDPOINT_RPC) 
console.log("VITE_THORCHAIN_SERVER", import.meta.env.VITE_THORCHAIN_SERVER)
console.log("VITE_IS_TESTNET", import.meta.env.VITE_IS_TESTNET)

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC
const thorchainEndpointRpc = 'https://rpc.ninerealms.com'
const thorchainEndpointRest = 'https://thornode.ninerealms.com'
const metadata = {
  name: 'Arkeo',
  description: 'Arkeo Airdrop',
  url: 'https://arkeo.network',
}

const evmChains = [mainnet]
const wagmiConfig = defaultWagmiConfig({
  chains: evmChains,
  projectId,
  metadata,
})
wagmiConfig.args.autoConnect = false

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: evmChains,
})

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const localArkeo: Chain = {
  chain_name: 'arkeo',
  status: 'live',
  chain_type: 'cosmos',
  network_type: 'mainnet',
  chain_id: 'arkeo-main-v1',
  pretty_name: 'Arkeo',
  bech32_prefix: 'arkeo',
  slip44: 118,
}
const localArkeoAssets: AssetList = {
  chain_name: 'arkeo',
  assets: [
    {
      name: 'Arkeo',
      symbol: 'arkeo',
      denom_units: [{ denom: 'arkeo', exponent: 8 }],
      base: 'arkeo',
      display: 'arkeo',
      type_asset: 'sdk.coin',
    },
  ],
}

root.render(
  <ChakraProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <ChainProvider
        chains={[...chains, localArkeo]}
        assetLists={[...assets, localArkeoAssets]}
        wallets={wallets}
        walletConnectOptions={{ signClient: { projectId: projectId } }}
        endpointOptions={{
          endpoints: {
            localarkeo: {
              rpc: [arkeoEndpointRpc],
              rest: [arkeoEndpointRest],
            },
            thorchain: {
              rpc: [thorchainEndpointRpc],
              rest: [thorchainEndpointRest],
            },
          },
        }}
      >
        <App />
      </ChainProvider>
    </WagmiConfig>
  </ChakraProvider>,
)
