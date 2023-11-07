import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import BscScanApi from "../scripts/bscscan";
import CoinGeckoAPI from "../scripts/coingecko";
import ImoCache from "../scripts/cache";

export const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [apiProviders, setApiProviders] = useState([]);
  const [gcCache, setGcCache] = useState(null);
  const [bscCache, setBscCache] = useState(null);

  useEffect(() => {
    const apis = [new CoinGeckoAPI("imo"), new BscScanApi()];
    const gcCache = new ImoCache(apis[0], "gc");
    gcCache.hydrate();

    const bscCache = new ImoCache(apis[1], "bsc");
    bscCache.hydrate();

    setApiProviders(apis);
    setGcCache(gcCache);
    setBscCache(bscCache);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (bscCache != null && gcCache != null) {
        const response = {
          bsc: await bscCache.get(),
          cg: await gcCache.get(),
        };
        setResponse(response);
      }
    }
    fetchData();
  }, [bscCache, gcCache]);

  return (
    <ApiContext.Provider
      value={{ api: response, apiProviders, gcCache, bscCache }}
    >
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
