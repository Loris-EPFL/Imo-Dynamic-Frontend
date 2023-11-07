import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


import './properties.css'
import firstFlatlivingRoom from '../../images/1st_flat/livingRoom.jpg'

import { ReactComponent as FlatSizeIcon } from "../../Icons/FlatSize.svg";
import { ReactComponent as FlatPriceIcon } from "../../Icons/FlatPrice.svg";
import { ReactComponent as FlatROIIcon } from "../../Icons/FlatROI.svg";
import { ReactComponent as FlatBurnIcon } from "../../Icons/FlatBurn.svg";
import { Language } from '../../Context';

const Properties = () => {
     // const { t } = useTranslation()

     const { LanguageUse, setLanguageUse } = useContext(Language)
     const [Mobile, setMobile] = useState(false)

     const { t, i18n } = useTranslation()
     useEffect(() => {
          WindowChange()
          setLanguageUse(i18n.language)
     }, [setLanguageUse, i18n.language])

     const HandleMobileMenu = () => {
          setMobile(!Mobile)
          // HandlerImageHover()
     }

     const HandlerCloseMobileMenu = () => {
          setMobile(false)
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

     const handleInformation = () => {
          if (Mobile) {
               HandleMobileMenu()
          }
          if (LanguageUse === 'en') {
               window.open('https://imo-invest.com/docs/Propriete1_informations.pdf')
          } else {
               window.open('https://imo-invest.com/docs/Property1_information.pdf')
          }
     }


     return (
          <div className='properties'>
               <div className='propertiesContainer'>
                    <div className='propertiesTitle'>{t('Properties')}</div>
                    <div className='propertiesList'>
                         <div className='propertiesItem '>
                              <div className='propertiesItemWrapper'>
                                   <div className='propertiesItemFront'>
                                        <div className='propertiesItemIcon'>
                                             <img id="firstFlatCoverPicture" src={firstFlatlivingRoom} alt=''></img>
                                        </div>
                                        <div className='propertiesItemText'>
                                             {t('Properties#1')}
                                             <div className='propertiesItemKeysInfos'>
                                                  <div className="flatType">
                                                       <FlatSizeIcon className='flatKeyInfosIcon' />
                                                       <p>T2 / 3.5</p>
                                                  </div>
                                                  <div className="flatPrice">
                                                       <FlatPriceIcon className='flatKeyInfosIcon' />
                                                       <p>CHF 320K</p>
                                                  </div>
                                                  <div className="flatRent">
                                                       <FlatBurnIcon className='flatKeyInfosIcon' />
                                                       <p>$ 1'000</p>
                                                  </div>
                                                  <div className="flatROI">
                                                       <FlatROIIcon className='flatKeyInfosIcon' />
                                                       <p>6.2%</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className='propertiesItemBack'>
                                        <div className='propertiesMoreDetails' onClick={handleInformation}>{t('MoreDetails')}</div>
                                   </div>
                                   {/* onClick={handleInformation} */}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Properties


