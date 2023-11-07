import React from 'react'

import { useTranslation } from 'react-i18next'

import real1 from '../../images/B1.png'
import real2 from '../../images/B2.png'
import real3 from '../../images/B3.png'

import './blockchain.css'

const Blockchain = () => {
     const { t } = useTranslation()
     return (
          <div className='blockchain'>
               <div className='blockchainContainer'>
                    <div className='blockchainLeft'>
                         <div className='blockchainLeftTitle'>{t('CTitle')}</div>
                         <div className='blockchainLeftText'>{t('C-blockchain')}</div>
                         <div className='blockchainLeftText'>{t('C-above')}</div>
                         {/*<div className='blockchainLeftText'>{t('A-IMO-project')}</div>*/}
                    </div>
                    <div className='blockchainRight'>
                         <div className='realEstateRightSVG'>
                              <img src={real1} alt='IMO real estate' className='realEstateRightSVGSize first' />
                         </div>
                         <div className='realEstateRightSVG last'>
                              <img src={real2} alt='IMO' className='realEstateRightSVGDown' />
                         </div>
                         <div className='realEstateRightSVG '>
                              <img src={real3} alt='IMO Invest' className='realEstateRightSVGSize second' />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Blockchain
