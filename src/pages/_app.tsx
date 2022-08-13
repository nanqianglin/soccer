import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import {
	connectorsForWallets,
	getDefaultWallets,
	RainbowKitProvider,
	wallet,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { Layout } from "components/Layout";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const customChain = {
	...chain.hardhat,
	nativeCurrency: {
		decimals: 18,
		name: "Cronos",
		symbol: "CRO",
	},
};

const { chains, provider } = configureChains(
	[customChain],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const connectors = connectorsForWallets([
	{
		groupName: "Recommended",
		wallets: [wallet.metaMask({ chains })],
	},
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<ChakraProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ChakraProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</QueryClientProvider>
	);
}

export default MyApp;
