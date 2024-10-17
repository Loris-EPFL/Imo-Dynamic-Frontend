import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Logo } from '../../Icons/Logo.svg'
import { ReactComponent as Twitter } from '../../Icons/Twitter.svg'
import { ReactComponent as Instagram } from '../../Icons/Instagram.svg'
import { ReactComponent as Medium } from '../../Icons/Medium.svg'
import { ReactComponent as Youtube } from '../../Icons/Youtube.svg'
import { ReactComponent as LinkedIn } from '../../Icons/LinkedInFooter.svg'
import { ReactComponent as Mail } from '../../Icons/Mail.svg'

import { Language } from '../../Context'

import './footer.css'

const Footer = () => {
     const { t } = useTranslation()
     const { LanguageUse } = useContext(Language)
     //Icons
     const handlerTwitter = () => {
          window.open('https://twitter.com/imo__invest/')
     }
     const handlerInstagram = () => {
          window.open('https://www.instagram.com/imo_invest/')
     }
     const handlerMedium = () => {
          window.open('https://imo-invest.medium.com')
     }
     const handlerYoutube = () => {
          window.open('https://www.youtube.com/channel/UCfpHpJXckLpsdsCUCIJoJQQ')
     }
     const handlerLinkedIn = () => {
          window.open('https://www.linkedin.com/company/imo-sa/')
     }
     const handlerMail = () => {
          window.open('mailto:contact@IMO-Invest.com?subject=Subject&body=Body%20goes%20here')
     }
     //Section 1
     const handlerGecko = () => {
          if (LanguageUse === 'en') {
               window.open('https://www.coingecko.com/en/coins/imo')
          } else {
               window.open('https://www.coingecko.com/fr/pièces/imo')
          }
     }
     const handlerCoinMarket = () => {
          window.open('https://coinmarketcap.com/currencies/imo/')
     }
     const handlerDextools = () => {
          window.open('https://www.dextools.io/app/en/base/pair-explorer/0x007bb7a4bfc214df06474e39142288e99540f2b3-0x4200000000000000000000000000000000000006-0x5a7a2bf9ffae199f088b25837dcd7e115cf8e1bb?t=1729172570105')
     }

     //Section 2
     const handlerTelegramEN = () => {
          window.open('https://t.me/IMO_Invest')
     }
     const handlerTelegramFR = () => {
          window.open('https://t.me/IMO_Invest_FR')
     }
     const handlerAnnouncement = () => {
          window.open('https://t.me/IMO_Invest')
     }

     //Section 3
     const handlerBalancer = () => {
          window.open(
               'https://balancer.fi/swap/base/ETH/0x5a7a2bf9ffae199f088b25837dcd7e115cf8e1bb'
          )
     }
     const handlerContract = () => {
          window.open('https://www.basescan.org/address/0x5a7a2bf9ffae199f088b25837dcd7e115cf8e1bb')
     }
     const handlerWhite = () => {
          if (LanguageUse === 'en') {
               window.open('http://imo-invest.com/docs/IMO_Whitepaper.pdf')
          } else {
               window.open('http://imo-invest.com/docs/IMO_Livre_blanc.pdf')
          }
     }

     return (
          <div className='footer'>
               <div className='footerContainer'>
                    <div className='footerLeft'>
                         <div className='footerLeftIcon'>
                              <Logo className='footerLeftMainIcon' />
                         </div>
                         <div className='footerLeftText'>{t('FooterReal')}</div>
                         <div className='footerLeftLinks'>
                              <div className='footerLeftItem' onClick={handlerTwitter}>
                                   <Twitter />
                              </div>
                              <div className='footerLeftItem' onClick={handlerInstagram}>
                                   <Instagram />
                              </div>
                              <div className='footerLeftItem' onClick={handlerMedium}>
                                   <Medium />
                              </div>
                              <div className='footerLeftItem' onClick={handlerYoutube}>
                                   <Youtube />
                              </div>
                              <div className='footerLeftItem' onClick={handlerLinkedIn}>
                                   <LinkedIn />
                              </div>
                              <div className='footerLeftItem' onClick={handlerMail}>
                                   <Mail />
                              </div>
                         </div>
                         <div className='footerLeftC'>&copy; {t('FooterCopy')}</div>
                    </div>
                    <div className='footerRight'>
                         <div className='footerRightColumn'>
                              <div className='footerRightTitle'>{t('Data')}</div>
                              <div className='footerRightLink' onClick={handlerGecko}>
                                   CoinGecko
                              </div>
                              <div className='footerRightLink' onClick={handlerCoinMarket}>
                                   CoinMarketCap
                              </div>
                              <div className='footerRightLink ' onClick={handlerDextools}>
                                   Dextools
                              </div>
                         </div>
                         <div className='footerRightColumn'>
                              <div className='footerRightTitle'>{t('Community')}</div>
                              <div className='footerRightLink' onClick={handlerTelegramEN}>
                                   Telegram (EN)
                              </div>
                              <div className='footerRightLink' onClick={handlerTelegramFR}>
                                   Telegram (FR)
                              </div>
                              <div className='footerRightLink' onClick={handlerAnnouncement}>
                                   {t('Announcements')} (EN)
                              </div>
                         </div>
                         <div className='footerRightColumn'>
                              <div className='footerRightTitle'>{t('SmartLinks')}</div>
                              <div className='footerRightLink' onClick={handlerBalancer}>
                                   Balancer
                              </div>
                              <div className='footerRightLink' onClick={handlerContract}>
                              {t('Contract')}
                              </div>
                              <div className='footerRightLink' onClick={handlerWhite}>
                              {t('Whitepaper')}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Footer
