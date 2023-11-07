import React from 'react'

import { useTranslation } from 'react-i18next'

import pres1 from '../../images/P1.png'
import pres2 from '../../images/P2.png'
import pres3 from '../../images/P3.png'

import './presentation.css'

const Presentation = () => {
     const { t } = useTranslation()
     return (
          <div className='presentaion'>
               <div className='presentaionContainer'>
                    <div className='presentaionLeft'>
                         <div className='realEstateRightSVG'>
                              <img src={pres1} alt='IMO Invest' className='realEstateRightSVGSize first' />
                         </div>
                         <div className='realEstateRightSVG last'>
                              <img src={pres2} alt='IMO' className='realEstateRightSVGDown' />
                         </div>
                         <div className='realEstateRightSVG '>
                              <img src={pres3} alt='IMO Invest' className='realEstateRightSVGSize second' />
                         </div>
                    </div>
                    <div className='presentaionRight'>
                         <div className='presentaionRightTitle'>{t('BTitle')}</div>
                         <div className='presentaionRightText'>{t('B-month')}</div>
                         <div className='presentaionRightText'>{t('B-Thus')}</div>
                    </div>
               </div>
          </div>
     )
}

export default Presentation
