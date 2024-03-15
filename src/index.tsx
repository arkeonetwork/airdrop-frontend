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

import '@interchain-ui/react/styles'

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID

const metadata = {
  name: 'Arkeo',
  description: 'Arkeo Airdrop',
  url: 'https://arkeo.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886'], // TODO: update to arkeo
}

const evmChains = [mainnet]
const wagmiConfig = defaultWagmiConfig({
  chains: evmChains,
  projectId,
  metadata,
})

createWeb3Modal({ wagmiConfig, projectId, chains: evmChains })

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const localArkeo: Chain = {
  chain_name: 'localarkeo',
  status: 'live',
  network_type: 'testnet',
  chain_id: 'arkeo',
  pretty_name: 'Arkeo',
  bech32_prefix: 'tarkeo',
  slip44: 931,
}
const localArkeoAssets: AssetList = {
  chain_name: 'localarkeo',
  assets: [
    {
      name: 'Arkeo',
      symbol: 'arkeo',
      denom_units: [{ denom: 'arkeo', exponent: 8 }],
      base: 'arkeo',
      display: 'arkeo',
    },
  ],
}
console.log({ chains })
root.render(
  <ChakraProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <ChainProvider
        chains={[...chains, localArkeo]}
        assetLists={[...assets, localArkeoAssets]}
        wallets={wallets}
        endpointOptions={{
          endpoints: {
            localarkeo: {
              rpc: ['http://localhost:26657'],
              rest: ['http://localhost:1317'],
            },
          },
        }}
      >
        <App />
      </ChainProvider>
    </WagmiConfig>
  </ChakraProvider>,
)
