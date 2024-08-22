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
import { createConfig } from 'wagmi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stake from './pages/Stake/Stake';
import DCBVaultInteraction from './components/Stake/DCBVaultInteraction';

import { WagmiProvider } from 'wagmi';
import {QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { http } from 'viem';
import { base, mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import useScrollManager from './hooks/useScrollManager'; // Import the custom hook

// ... (rest of your imports and configurations)
const config = createConfig({
  chains: [mainnet, base],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http('https://base.drpc.org'),
  },
});
  
const queryClient = new QueryClient();

const AppContent = () => {
  const [LanguageUse, setLanguageUse] = useState("en");
  useScrollManager(); // Use the custom hook here

  return (
    <ApiProvider>
      <Language.Provider value={{ LanguageUse, setLanguageUse }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Stake" element={<Stake />} />
        </Routes>
        <Footer />
      </Language.Provider>
    </ApiProvider>
  );
};

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "5053d254-7e93-489a-908f-4ca299e84bb8",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Router>
              <AppContent />
            </Router>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider> 
    </DynamicContextProvider>
  );
};

export default App;
