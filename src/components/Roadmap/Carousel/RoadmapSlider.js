import React from 'react'

const RoadmapSlider = ({ isCurrent, icon, data, text, index, text2, text3, text4 }) => {
     let visibleClass = ''
     if (isCurrent) {
          visibleClass = ' carousel__slide--visible'
     }
     if (isCurrent) {
          let t = document.getElementsByClassName('carousel__slide')
          let x = document.getElementsByClassName('carousel')
          let y = null
          if (t[0] !== undefined) {
               if (window.innerWidth < 600) {
                    y = t[index].offsetHeight + 50
                    x[0].style.height = y + 'px'
               } else if (window.innerWidth > 1050) {
                    x[0].style.height = 390 + 'px'
               } else {
                    x[0].style.height = 450 + 'px'
               }
          }
     }

     return (
          <div className={`carousel__slide${visibleClass}`}>
               <div className='carouselItems'>
                    <div className='carouselData'>{data}</div>
                    <div className='carouselTextContainer'>
                         <div className='carouseltext'>{text}</div>
                         <div className='carouseltext'>{text2}</div>
                         <div className='carouseltext'>{text3}</div>
                         <div className='carouseltext'>{text4}</div>
                    </div>
               </div>
          </div>
     )
}

export default RoadmapSlider
