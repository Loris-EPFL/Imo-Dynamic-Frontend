import React, { useContext } from 'react'
import { Language } from '../../Context'
import { useTranslation } from 'react-i18next'

import './company.css'

const Company = () => {
     const { LanguageUse } = useContext(Language)
     const { t } = useTranslation()

     const handlRegisterOnClick = () => {
          if (LanguageUse === "en") {
               window.open(
                    'https://www.moneyhouse.ch/en/company/blockchain-invest-sa-19577583521'
               )
          } else {
               window.open(
                    'https://www.moneyhouse.ch/fr/company/blockchain-invest-sa-19577583521'
               )
          }
     }

     return (
          <div className='company'>
               <div className='companyComponent'>
                    <div className='companyTitle'>{t('Swiss')}</div>
                    <div className='companyText'>{t('SwissCompany')}</div>
                    <div className='companyButton'>
                         <div onClick={handlRegisterOnClick} className='button'>{t('SwissButton')}</div>
                    </div>
               </div>
          </div>

     )
}

export default Company