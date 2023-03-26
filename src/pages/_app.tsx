import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { goerli } from "@wagmi/core/chains";

import { ChakraProvider } from "@chakra-ui/react";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [goerli], // you can add more chains here like chain.mainnet, chain.optimism etc.
    [
      jsonRpcProvider({
        rpc: () => {
          return {
            http: "https://rpc.ankr.com/eth_goerli", // go to https://www.ankr.com/protocol/ to get a free RPC for your network
          };
        },
      }),
      publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "NFT minting dApp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  });

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
