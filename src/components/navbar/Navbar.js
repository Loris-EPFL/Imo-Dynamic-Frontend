import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Language } from '../../Context'
import DropDown from '../DropDown/DropDown'

import { ReactComponent as Logo } from '../../Icons/Logo.svg'
import { ReactComponent as MobileMenu } from '../../Icons/MobileMenu.svg'
import { ReactComponent as Close } from '../../Icons/Close.svg'

import DropDownpng from '../../images/DropDown.png'
import './navbar.css'

const Navbar = () => {
     const { LanguageUse, setLanguageUse } = useContext(Language)
     const [Mobile, setMobile] = useState(false)

     const { t, i18n } = useTranslation()
     useEffect(() => {
          WindowChange()
          setLanguageUse(i18n.language)
     }, [setLanguageUse, i18n.language])

     const HandleMobileMenu = () => {
          setMobile(!Mobile)
          HandlerImageHover()
     }

     const HandlerCloseMobileMenu = () => {
          setMobile(false)
     }

     const HandlerImageHover = () => {
          let Image = document.getElementsByClassName('realEstateRight')
          if (!Mobile) {
               Image[0].style.display = 'none'
          } else {
               Image[0].style.display = 'flex'
          }
     }

     const WindowChange = () => {
          if (window.innerWidth > 700) {
               setMobile(false)
          }
     }

     const handlerLanguageChange = (value) => {
          if (Mobile) {
               HandleMobileMenu()
          }
          if (LanguageUse !== value) {
               setLanguageUse(value)
               i18n.changeLanguage(value)
          }
     }

     const handleWhitepaper = () => {
          if (Mobile) {
               HandleMobileMenu()
          }
          if (LanguageUse === 'en') {
               window.open('http://imo-invest.com/docs/IMO_Whitepaper_V4.pdf')
          } else {
               window.open('http://imo-invest.com/docs/IMO_Livre_blanc_V4.pdf')
          }
     }

     const handleContract = () => {
          if (Mobile) {
               HandleMobileMenu()
          }
          window.open('https://bscscan.com/token/0x94d79c325268c898d2902050730f27a478c56cc1')
     }
     const handleAudit = () => {
          if (Mobile) {
               HandleMobileMenu()
          }
          window.open('http://imo-invest.com/docs/IMO%20Audit%20V2.pdf')
     }
     const handleInvest = () => {
          if (Mobile) {
               HandleMobileMenu()
          }
          window.open(
               'https://pancakeswap.finance/swap?inputCurrency=0x2170Ed0880ac9A755fd29B2688956BD959F933F8&outputCurrency=0x94D79c325268C898d2902050730f27A478C56cC1#/swap?&exactField=output&outputCurrency=0x94d79c325268c898d2902050730f27a478c56cc1'
          )
     }

     window.addEventListener('resize', WindowChange)

     if (Mobile) {
          const body = document.body
          body.style.overflowY = 'hidden'
     } else {
          const body = document.body
          body.style.overflowY = 'scroll'
     }
     const [dropdown, setdropdown] = useState(false)

     const onMouseEnter = () => {
          setdropdown(true)
     }
     const onMouseLeave = () => {
          setdropdown(false)
          HandlerCloseMobileMenu()
     }

     return (
          <div className='navbar'>
               <div className='navbarContainer'>
                    <div className='navbarIcon'>
                         <Logo className='navbarLogo' />
                    </div>
                    <div className={Mobile ? 'navbarMenu active' : 'navbarMenu'}>
                         <div className={Mobile ? 'MobileIcon' : 'navbarDN'} onClick={HandleMobileMenu}>
                              <Close />
                              <Logo className='navbarLogo' />
                         </div>
                         <div className='navbarLink hover' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                              <div className='navbarLinkDropDown'>
                                   {dropdown && <DropDown onClick={HandlerCloseMobileMenu} />}
                                   {t('Presentation')}
                                   <div className='navbarLinkIcon'>
                                        <img src={DropDownpng} alt='' style={{ width: 12 }} />
                                   </div>
                              </div>
                         </div>
                         <div className='navbarLink' onClick={handleWhitepaper}>
                              {t('Whitepaper')}
                         </div>
                         <div className='navbarLink' onClick={handleContract}>
                              {t('Contract')}
                         </div>
                         <div className='navbarLink' onClick={handleAudit}>
                              Audit
                         </div>
                         <div className='navbarLink' onClick={handleInvest}>
                              {t('Invest')}
                         </div>

                         <div className={Mobile ? 'MobileLanguage' : 'navbarDN'}>
                              <div
                                   onClick={() => handlerLanguageChange('en')}
                                   className={
                                        LanguageUse === 'en'
                                             ? 'navbarLanguageSelect activeLanguage'
                                             : 'navbarLanguageSelect'
                                   }
                              >
                                   EN
                              </div>
                              <div
                                   onClick={() => handlerLanguageChange('fr')}
                                   className={
                                        LanguageUse === 'fr'
                                             ? 'navbarLanguageSelect activeLanguage'
                                             : 'navbarLanguageSelect'
                                   }
                              >
                                   FR
                              </div>
                         </div>
                    </div>
                    <div className='navbarLanguage'>
                         <div
                              onClick={() => handlerLanguageChange('en')}
                              className={
                                   LanguageUse === 'en'
                                        ? 'navbarLanguageSelect activeLanguage'
                                        : 'navbarLanguageSelect'
                              }
                         >
                              EN
                         </div>
                         <div
                              onClick={() => handlerLanguageChange('fr')}
                              className={
                                   LanguageUse === 'fr'
                                        ? 'navbarLanguageSelect activeLanguage'
                                        : 'navbarLanguageSelect'
                              }
                         >
                              FR
                         </div>
                    </div>
                    <div className='navbarMobileMenu' onClick={HandleMobileMenu}>
                         <MobileMenu />
                    </div>
               </div>
          </div>
     )
}

export default Navbar
