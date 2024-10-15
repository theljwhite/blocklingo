import { Chain } from "@rainbow-me/rainbowkit";

export const polygonAmoy: Chain = {
  id: 80002,
  name: "polygonAmoy",
  iconUrl: "/chainImages/polygon.svg",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc-amoy.polygon.technology/"],
    },
    default: {
      http: [
        `${import.meta.env.VITE_ALCHEMY_AMOY}`,
        `${import.meta.env.VITE_INFURA_AMOY}`,
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Polygon Amoy Etherscan",
      url: "https://amoy.polygonscan.com/",
    },
    default: {
      name: "Polygon Amoy Oklink",
      url: "https://amoy.polygonscan.com/",
    },
  },
  testnet: true,
};
