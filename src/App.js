import React, { useState } from "react";
import { Language } from "./Context";
import { ApiProvider } from "./contexts/ApiContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main/Main";

import { Route } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const [LanguageUse, setLanguageUse] = useState("en");
  return (
    <ApiProvider>
      <Language.Provider value={{ LanguageUse, setLanguageUse }}>
        <Navbar />
        <Main />
        <Footer />
      </Language.Provider>
    </ApiProvider>
  );
};

export default App;
