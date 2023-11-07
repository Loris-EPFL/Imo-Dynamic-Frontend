import React, { useContext } from 'react'

import { useTranslation } from 'react-i18next'

import { Language } from '../../Context'

import real1 from '../../images/G1.png'
import real2 from '../../images/G2.png'
import real3 from '../../images/G3.png'

import './realEstate.css'

const RealEstate = () => {
     const { LanguageUse } = useContext(Language)
     const { t } = useTranslation()
     const handleFR = () => {
          window.open('https://youtu.be/lyb37D_je_A')
     }
     const handleEN = () => {
          window.open(
               'https://pancakeswap.finance/swap?inputCurrency=0x2170Ed0880ac9A755fd29B2688956BD959F933F8&outputCurrency=0x94D79c325268C898d2902050730f27A478C56cC1#/swap?&exactField=output&outputCurrency=0x94d79c325268c898d2902050730f27a478c56cc1'
          )
     }

     return (
          <div className='realEstate'>
               <div className='realEstateContainer'>
                    <div className='realEstateLeft'>
                         <div className='realEstateLeftTitle'>{t('A-blockchain')}</div>
                         <div className='realEstateLeftText'>{t('A-IMO')}</div>
                         <div className='realEstateLeftText'>{t('A-IMO-project')}</div>
                         <div className='realEstateLeftText'>{t('A-IMO-project2')}</div>
                         <div className='realEstateLeftButton'>
                              <div className='button' onClick={handleEN}>
                                   <div className='realEstateLeftButtonText'>
                                        {LanguageUse === 'en' ? 'Invest' : 'Investir'}
                                   </div>
                              </div>
                              <div className={LanguageUse === 'fr' ? 'button white' : 'hide'} onClick={handleFR}>
                                   <div className='realEstateLeftButtonText white'>Comment acheter ? </div>
                              </div>
                         </div>
                    </div>
                    <div className='realEstateRight'>
                         <div className='realEstateRightSVG '>
                              <img id='1' src={real1} alt='IMO Invest' className='realEstateRightSVGSize first' />
                         </div>
                         <div className='realEstateRightSVG last'>
                              <img src={real2} alt='IMO ' className='realEstateRightSVGDown' />
                         </div>
                         <div className='realEstateRightSVG'>
                              <img id='1' src={real3} alt='IMO crypto' className='realEstateRightSVGSize second' />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default RealEstate
