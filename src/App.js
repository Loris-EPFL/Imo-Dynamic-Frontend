import React, { useState } from "react";
import { Language } from "./Context";
import { ApiProvider } from "./contexts/ApiContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main/Main";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  
} from 'wagmi';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
  
const queryClient = new QueryClient();


const App = () => {
  const [LanguageUse, setLanguageUse] = useState("en");
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "5053d254-7e93-489a-908f-4ca299e84bb8",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
          
              <ApiProvider>
                <Language.Provider value={{ LanguageUse, setLanguageUse }}>
                  <Navbar />
                  <Main />
                  <Footer />
                </Language.Provider>
              </ApiProvider>
        </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider> 
    </DynamicContextProvider>
  );
};

export default App;
