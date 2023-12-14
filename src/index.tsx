import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/provider';
import { theme } from './theme.ts';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet } from 'viem/chains';
import { ChainProvider } from '@cosmos-kit/react';
import { chains, assets } from 'chain-registry';
import { wallets } from '@cosmos-kit/keplr';

import '@interchain-ui/react/styles';

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;

const metadata = {
  name: 'Arkeo',
  description: 'Arkeo Airdrop',
  url: 'https://arkeo.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886'], // TODO: update to arkeo
};

const evmChains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains: evmChains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains: evmChains });

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log({ chains });
root.render(
  <ChakraProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <ChainProvider
        chains={chains} // supported chains
        assetLists={assets} // supported asset lists
        wallets={wallets} // supported wallets
        // walletConnectOptions={...} // required if `wallets` contains mobile wallets
      >
        <App />
      </ChainProvider>
    </WagmiConfig>
  </ChakraProvider>
);
