import React, { useEffect, useState } from 'react'

import IconButton from './IconButton'

const Carousel = ({ slideDuration = 3000, autoPlay = true, children }) => {
     const [currentSlide, setSlide] = useState(0)
     const [isPlaying, setIsPlaying] = useState(autoPlay)
     const numSlides = children.length
     useEffect(() => {
          if (isPlaying) {
               const timeoutId = setTimeout(() => {
                    setSlide((currentSlide + 1) % numSlides)
               }, slideDuration)

               return () => clearTimeout(timeoutId)
          }
     }, [isPlaying, currentSlide, numSlides, slideDuration])

     const handleIndexClick = (index) => {
          setSlide(index)
          setIsPlaying(false)
     }
     const handlePrevClick = () => {
          const nextIndex = (currentSlide - 1 + numSlides) % numSlides
          setSlide(nextIndex)
     }
     const handleNextClick = () => {
          const nextIndex = (currentSlide + 1) % numSlides
          setSlide(nextIndex)
     }

     const slides = React.Children.map(children, (child) => {
          return React.cloneElement(child, {
               isCurrent: +child.props.index === currentSlide,
          })
     })

     const slideSelectors = []
     for (let i = 0; i < numSlides; i++) {
          slideSelectors.push(
               <IconButton
                    key={i}
                    className={`carousel__selector${currentSlide === i ? ' selected' : ''}`}
                    type={currentSlide === i ? 'circleWidth' : 'circle'}
                    style={{ color: 'red' }}
                    onClick={() => handleIndexClick(i)}
               />
          )
     }

     return (
          <>
               <div className='carousel'>
                    {slides}
                    <div className='carousel__overlay'>
                         <div className='carousel__selectors'>{slideSelectors}</div>
                    </div>
                    <div className='carousel__Controler'>
                         <div className='carouselButtonBack' onClick={handlePrevClick}>
                              <IconButton
                                   className='carousel__control back'
                                   type='backward'
                                   aria-label='Backward'
                              />
                              <IconButton
                                   className='carousel__control hoverB'
                                   type='backwardHover'
                                   aria-label='Backward'
                              />
                         </div>
                         <div className='carouselButtonFor' onClick={handleNextClick}>
                              <IconButton className='carousel__control for' type='forward' aria-label='Forward' />
                              <IconButton
                                   className='carousel__control hoverF'
                                   type='forwardHover'
                                   aria-label='Forward'
                              />
                         </div>
                    </div>
               </div>
          </>
     )
}

export default Carousel