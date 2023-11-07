import React, { useRef } from 'react'

import { useTranslation } from 'react-i18next'

import Daniel from '../../images/Daniel.png'
import Knut from '../../images/Knut.png'
import Adrien from '../../images/Adrien.png'

import { ReactComponent as Telegram } from '../../Icons/Telegram.svg'
import { ReactComponent as LinkedIn } from '../../Icons/Linkedin.svg'

import './team.css'

const Team = () => {
     let myRef = useRef(null)
     //const { LanguageUse } = useContext(Language)
     const { t } = useTranslation()

     const handlerDanielTelegram = () => {
          window.open('https://t.me/daniel_frtn')
     }
     const handlerKnutTelegram = () => {
          window.open('https://t.me/knutdr')
     }
     const handlerKnutLinkedIn = () => {
          window.open('https://www.linkedin.com/in/knut-robillard/')
     }
     const handlerAdrianTelegram = () => {
          window.open('https://t.me/adrienrbl')
     }
     return (
          <div ref={myRef} className='team'>
               <div className='teamContainer'>
                    <div className='teamTitle'>{t('TeamTitle')}</div>
                    <div className='teamTextContainer'>
                         <div className='teamText'>{t('Team')}</div>
                         <div className='teamText'>{t('Team2')}</div>
                    </div>

                    <div className='teamList'>
                         <div className='teamItem'>
                              <div className='teamItemIcon'>
                                   <img src={Knut} alt='' />
                              </div>
                              <div className='teamItemName'>Knut R.</div>
                              <div className='teamItemCountry'>{t('TeamCountry')}</div>
                              <div className='teamItemObligations'>{t('TeamKnut')}</div>
                              <div className='teamItemIconContact'>
                                   <div className='teamItemIconContactItem' onClick={handlerKnutTelegram}>
                                        <Telegram />
                                   </div>
                                   <div className='teamItemIconContactItem' onClick={handlerKnutLinkedIn}>
                                        <LinkedIn />
                                   </div>
                              </div>
                         </div>
                         <div className='teamItem'>
                              <div className='teamItemIcon'>
                                   <img src={Daniel} alt='' />
                              </div>
                              <div className='teamItemName'>Daniel F.</div>
                              <div className='teamItemCountry'>{t('TeamCountry')}</div>
                              <div className='teamItemObligations'>{t('TeamDaniel')}</div>
                              <div className='teamItemIconContact'>
                                   <div className='teamItemIconContactItem' onClick={handlerDanielTelegram}>
                                        <Telegram />
                                   </div>
                              </div>
                         </div>

                         <div className='teamItem'>
                              <div className='teamItemIcon'>
                                   <img src={Adrien} alt='' />
                              </div>
                              <div className='teamItemName'>Adrien B.</div>
                              <div className='teamItemCountry'>{t('TeamCountry')}</div>
                              <div className='teamItemObligations'>{t('TeamAdrian')}</div>
                              <div className='teamItemIconContact'>
                                   <div className='teamItemIconContactItem' onClick={handlerAdrianTelegram}>
                                        <Telegram />
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Team
