import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains, wagmiClient, queryClient };
