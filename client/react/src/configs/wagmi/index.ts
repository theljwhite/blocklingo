import { http, createConfig } from "wagmi";
import { mainnet, polygonAmoy } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  metaMaskWallet,
  okxWallet,
  omniWallet,
  rabbyWallet,
  rainbowWallet,
  tahoWallet,
  trustWallet,
  walletConnectWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rainbowWallet,
        okxWallet,
        tahoWallet,
        coinbaseWallet,
        argentWallet,
        trustWallet,
        imTokenWallet,
        omniWallet,
        rabbyWallet,
        phantomWallet,
      ],
    },
  ],
  { appName: "TODO", projectId: import.meta.env.VITE_WC_PROJECT_ID }
);

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
  connectors,
});
