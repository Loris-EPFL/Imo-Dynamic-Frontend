import React from 'react'

import { ReactComponent as Backward } from '../../../Icons/Backward.svg'
import { ReactComponent as BackwardHover } from '../../../Icons/BackwardHover.svg'
import { ReactComponent as Forward } from '../../../Icons/Forward.svg'
import { ReactComponent as ForwardHover } from '../../../Icons/ForwardHover.svg'
import { ReactComponent as Dot } from '../../../Icons/Dot.svg'
import { ReactComponent as DotWidth } from '../../../Icons/DotWidth.svg'

const IconButton = ({ className, type, onClick, dataIndex }) => {
     let iconClass
     switch (type) {
          case 'backward':
               iconClass = <Backward />
               break
          case 'backwardHover':
               iconClass = <BackwardHover />
               break
          case 'circle':
               iconClass = <Dot />
               break
          case 'circleWidth':
               iconClass = <DotWidth />
               break
          case 'forwardHover':
               iconClass = <ForwardHover />
               break
          case 'forward':
               iconClass = <Forward />
               break
          default:
               iconClass = ''
     }
     return (
          <button className={`${className}`} onClick={onClick} aria-label='Carousel'>
               {iconClass}
          </button>
     )
}

export default IconButton
