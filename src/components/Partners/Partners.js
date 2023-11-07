import React, { useContext } from 'react'

import { ReactComponent as BscScan } from '../../Icons/PartnersBscScan.svg'
import { ReactComponent as PancakeSwap } from '../../Icons/PartnersPancakeSwap.svg'
import { ReactComponent as CoinGecko } from '../../Icons/PartnersCoinGecko.svg'
import Dext from '../../images/Dext.png'
import { ReactComponent as CoinMarketCap } from '../../Icons/PartnersCoinMarketCap.svg'

import { Language } from '../../Context'

import './partners.css'

const Partners = () => {
     const { LanguageUse } = useContext(Language)
     const handleBscScan = () => {
          window.open('https://bscscan.com/token/0x94d79c325268c898d2902050730f27a478c56cc1')
     }
     const handlePancakeSwap = () => {
          window.open(
               'https://pancakeswap.finance/swap#/swap?&exactField=output&outputCurrency=0x94d79c325268c898d2902050730f27a478c56cc1'
          )
     }
     const handleCoinGecko = () => {
          if (LanguageUse === 'en') {
               window.open('https://www.coingecko.com/en/coins/imo')
          } else {
               window.open('https://www.coingecko.com/fr/pièces/imo')
          }
     }
     const handleDext = () => {
          window.open('https://www.dextools.io/app/bsc/pair-explorer/0x0a9072e03e08070fc02e691dcae8f9d70223d949')
     }
     const handleCoinMarketCap = () => {
          window.open('https://coinmarketcap.com/currencies/imo/')
     }
     return (
          <div className='partners'>
               <div className='partnersContainer'>
                    <div className='partnersItem' onClick={handleBscScan}>
                         <BscScan />
                    </div>
                    <div className='partnersItem' onClick={handlePancakeSwap}>
                         <PancakeSwap />
                    </div>
                    <div className='partnersItem' onClick={handleCoinGecko}>
                         <CoinGecko />
                    </div>
                    <div className='partnersItem full' onClick={handleDext}>
                         <img src={Dext} alt='' />
                    </div>
                    <div className='partnersItem full' onClick={handleCoinMarketCap}>
                         <CoinMarketCap />
                    </div>
               </div>
          </div>
     )
}

export default Partners
