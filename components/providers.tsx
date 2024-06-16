import React, { ReactNode } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, lineaTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

interface ProvidersProps {
  children: ReactNode;
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const chains = [polygonMumbai, sepolia, lineaTestnet];

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const createConnectors = () =>
  connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ]);

const wagmiConfig = createConfig({
  connectors: createConnectors(),
  publicClient: {}, // Replace with actual configuration
  webSocketPublicClient: {}, // Replace with actual configuration
});

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
