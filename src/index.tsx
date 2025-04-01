import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from './theme.ts'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets } from '@cosmos-kit/keplr-extension'
import { Chain, AssetList } from '@chain-registry/types'
import '@interchain-ui/react/globalStyles'
import '@interchain-ui/react/styles'
import { KeplrProvider } from './contexts/KeplrContext'

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID
const arkeoEndpointRest = import.meta.env.VITE_ARKEO_ENDPOINT_REST
const arkeoEndpointRpc = import.meta.env.VITE_ARKEO_ENDPOINT_RPC
const thorchainEndpointRpc = 'https://rpc.ninerealms.com'
const thorchainEndpointRest = 'https://thornode.ninerealms.com'


const queryClient = new QueryClient()



const metadata = {
  name: 'Arkeo',
  description: 'Arkeo Airdrop',
  url: 'https://arkeo.network',
  icons: ['https://github.com/chainapsis/keplr-chain-registry/blob/main/images/arkeo-main-v1/chain.png']
}

const evmChains = [mainnet]
// const wagmiConfig = defaultWagmiConfig({
//   chains: evmChains,
//   projectId,
//   metadata,
// })
// wagmiConfig.args.autoConnect = false

// createWeb3Modal({
//   wagmiConfig,
//   projectId,
//   chains: evmChains,
// })

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
      denom_units: [{ denom: 'uarkeo', exponent: 8 }],
      base: 'arkeo',
      display: 'arkeo',
      type_asset: 'sdk.coin',
    },
  ],
}

root.render(
  <ChakraProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <KeplrProvider>
        <ChainProvider
          chains={[...chains, localArkeo]}
          assetLists={[...assets, localArkeoAssets]}
          wallets={wallets}
          throwErrors={false}
          walletConnectOptions={{ signClient: { projectId: projectId } }}
          endpointOptions={{
            endpoints: {
              arkeo: {
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
      </KeplrProvider>
    </WagmiConfig>
  </ChakraProvider>,
)
