import React from 'react'
import './Campus.css'
import gallery_1 from '../../assets/images (9).jpeg'
import gallery_2 from '../../assets/images (7).jpeg'
import gallery_3 from '../../assets/images (8).jpeg'
import gallery_4 from '../../assets/images (10).jpeg'

const Campus = () => {
  return (
     <div className='campus'>
        <div className='gallery'>
            <img src={gallery_1} alt=""/>
             <img src={gallery_2} alt=""/>
              <img src={gallery_3} alt=""/>
               <img src={gallery_4} alt=""/>
        </div>
        <button className='btn dark-btn'>See more here</button>
     </div>
  )
}

export default Campus