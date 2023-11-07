import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './dropDown.css'

const DropDown = () => {
     const { t } = useTranslation()
     const [click, setclick] = useState(false)

     const handleClick = () => setclick(!click)

     const handlerData = () => {
          var myRef = document.getElementsByClassName('dataScience')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 80 })
     }
     const handlerPresen = () => {
          var myRef = document.getElementsByClassName('presentaion')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 80 })
     }
     const handlerBlockchain = () => {
          var myRef = document.getElementsByClassName('blockchain')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 80 })
     }
     const handlerCompany = () => {
          var myRef = document.getElementsByClassName('company')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 80 })
     }
     const handlerProject = () => {
          var myRef = document.getElementsByClassName('project')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 20 })
     }
     const handlerTeam = () => {
          var myRef = document.getElementsByClassName('team')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 20 })
     }
     const handlerPie = () => {
          var myRef = document.getElementsByClassName('pieChart')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop - 20 })
     }

     return (
          <div className='dropDown'>
               <div onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
                    <div className='dropStatusList'>
                         <div className='dropStatusItem' onClick={handlerData}>
                              <div className='dropStatusText'>{t('DataTitle')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerPresen}>
                              <div className='dropStatusText'>{t('BTitle')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerBlockchain}>
                              <div className='dropStatusText'>{t('CTitle')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerCompany}>
                              <div className='dropStatusText'> {t('Swiss')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerProject}>
                              <div className='dropStatusText'> {t('Project')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerTeam}>
                              <div className='dropStatusText'> {t('TeamTitle')}</div>
                         </div>
                         <div className='dropStatusItem' onClick={handlerPie}>
                              <div className='dropStatusText'> {t('Tokenomics')}</div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default DropDown
