const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy endpoints
app.use('/api/coingecko/btcprice', createProxyMiddleware({
  target: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', // CoinGecko API endpoint
  changeOrigin: true,
  pathRewrite: {
    '^/api/coingecko/btcprice': '', // Rewrite URL path
  },
}));

// Serve the application at the given port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});