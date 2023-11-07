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
               <div className='roadmapContainer'>
                    <div className='roadmapTitle'>{t('Roadmap')}</div>
                    <div className='roadmapIcon'>
                         <RoadmapSvg />
                    </div>
                    <div className='roadmapCarousel'>
                         <Carousel slideDuration={SLIDE_DURATION} autoPlay={true}>
                              {LanguageUse === 'en'
                                   ? dummyDataEn.map((slide) => (
                                          <RoadmapSlider
                                               key={slide.id}
                                               index={slide.id}
                                               icon={slide.icon}
                                               data={slide.data}
                                               text={slide.text}
                                               text2={slide.text2}
                                               text3={slide.text3}
                                               text4={slide.text4}
                                          />
                                     ))
                                   : dummyDataFr.map((slide) => (
                                          <RoadmapSlider
                                               key={slide.id}
                                               index={slide.id}
                                               icon={slide.icon}
                                               data={slide.data}
                                               title={slide.title}
                                               text={slide.text}
                                               text2={slide.text2}
                                               text3={slide.text3}
                                               text4={slide.text4}
                                          />
                                     ))}
                         </Carousel>
                    </div>
               </div>
          </div>
     )
}

export default Roadmap
