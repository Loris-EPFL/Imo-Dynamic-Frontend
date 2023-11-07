import React, { useContext } from 'react'
import { Language } from '../../Context'
import { useTranslation } from 'react-i18next'

import './propertiesDetails.css'

import firstFlatBalcony from '../../images/1st_flat/balcony.jpg'
import firstFlatView from '../../images/1st_flat/view.jpg'
import firstFlatKitchen from '../../images/1st_flat/kitchen.jpg'
import firstFlatMainRoom from '../../images/1st_flat/mainRoom.jpg'
import firstFlatDressingRoom from '../../images/1st_flat/dressingRoom.jpg'
import firstFlatDressingRoom2 from '../../images/1st_flat/dressingRoom2.jpg'
import firstFlatSecondRoom from '../../images/1st_flat/secondRoom.jpg'
import firstFlatLaundry from '../../images/1st_flat/laundry.jpg'
import firstFlatlivingRoom from '../../images/1st_flat/livingRoom.jpg'
import firstFlatlivingRoom2 from '../../images/1st_flat/livingRoom2.jpg'
import firstFlatlivingRoom3 from '../../images/1st_flat/livingRoom3.jpg'



const FirstPropertyDetails = () => {
    const { LanguageUse } = useContext(Language)
    const { t } = useTranslation()

    return (

        <div className='PropertyPageContainer'>
            <div className='PropertyPageTitle'>{t('FirstPropertyPageTitle')}</div>
            <div className='PropertyPageText'>{t('FirstPropertyPageText')}</div>
            <div className='PropertyPagePictures'>
                <img src={firstFlatBalcony} alt=''></img>
                <img src={firstFlatView} alt=''></img>
                <img src={firstFlatlivingRoom} alt=''></img>
                <img src={firstFlatlivingRoom2} alt=''></img>
                <img src={firstFlatlivingRoom3} alt=''></img>
                <img src={firstFlatKitchen} alt=''></img>
                <img src={firstFlatMainRoom} alt=''></img>
                <img src={firstFlatDressingRoom} alt=''></img>
                <img src={firstFlatDressingRoom2} alt=''></img>
                <img src={firstFlatSecondRoom} alt=''></img>
                <img src={firstFlatLaundry} alt=''></img>
            </div>
        </div>

    )
}
export default FirstPropertyDetails
