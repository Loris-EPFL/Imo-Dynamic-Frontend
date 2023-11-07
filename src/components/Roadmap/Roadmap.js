import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Carousel from './Carousel/Carousel'
import dummyDataEn from './Carousel/DummyDataEn.json'
import dummyDataFr from './Carousel/DummyDataFr.json'
import RoadmapSlider from './Carousel/RoadmapSlider'

import { ReactComponent as RoadmapSvg } from '../../Icons/Roadmap.svg'

import { Language } from '../../Context'

import './roadmap.css'


const Roadmap = () => {
     const { t } = useTranslation()
     const { LanguageUse } = useContext(Language)
     const SLIDE_DURATION = 5000
     return (
          <div className='roadmap'>
          </div>
     )
}

export default Roadmap
