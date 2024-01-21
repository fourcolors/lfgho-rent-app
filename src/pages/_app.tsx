import "@/styles/globals.css";
import { siweClient } from "@/utils/siweClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, sepolia } from "wagmi";

const queryClient = new QueryClient();

const chains = [sepolia];
const config = createConfig(
  getDefaultConfig({
    appName: "RentFi",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <siweClient.Provider>
        <ConnectKitProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
}
