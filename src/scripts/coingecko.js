class CoinGeckoAPI {
     constructor(token) {
          this.token = token
     }

     get() {
          return new Promise((resolve, reject) => {
               fetch(`https://api.coingecko.com/api/v3/coins/${this.token}`)
                    .then((response) => response.json())
                    .then((json) => {
                         resolve(json)
                    })
                    .catch((e) => {
                         reject(e)
                    })
          })
     }
}
export default CoinGeckoAPI
