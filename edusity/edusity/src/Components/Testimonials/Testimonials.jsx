import React, {useRef} from 'react'
import './Testimonials.css'
import next_icon from '../../assets/images (13).jpeg'
import back_icon from '../../assets/download.jpeg'
import user_1 from '../../assets/images (12).jpeg'
import user_2 from '../../assets/download (1).jpeg'
import user_3 from '../../assets/images (12).jpeg'
import user_4 from '../../assets/images (14).jpeg'


const Testimonials = () => {
         const slider = useRef();
         let tx=0;
 const slideForward = ()=>{
    if(tx > -50){
        tx -= 25;
    }
    slider.current.style.transform = `translate(${tx}%)`;
 }
 const slideBackward=()=>{
      if(tx < 0){
        tx += 25;
    }
    slider.current.style.transform = `translate(${tx}%)`;
 }

  return (
   <div className='testimonials'>
    <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
    <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
    <div className="slider">
        <ul ref={slider}>
            <li>
                <div className='slide'>
                    <div className="user-info">
                        <img src={user_1} alt="" />
                        <div>
                            <h3>William Jackson</h3>
                            <span>Edusity, USA</span>
                        </div>
                    </div>
                    <p>
                        Choosing to pursue my degree at Edusity was one of the 
                        best decisions I've ever made. The supportive community, state-of-the-art facilites, and
                        commitment to academic excellence have truly exceeded my expectations.
                    </p>
                </div>
            </li>


             <li>
                <div className='slide'>
                    <div className="user-info">
                        <img src={user_2} alt="" />
                        <div>
                            <h3>William Jackson</h3>
                            <span>Edusity, USA</span>
                        </div>
                    </div>
                    <p>
                        Choosing to pursue my degree at Edusity was one of the 
                        best decisions I've ever made. The supportive community, state-of-the-art facilites, and
                        commitment to academic excellence have truly exceeded my expectations.
                    </p>
                </div>
            </li>

             <li>
                <div className='slide'>
                    <div className="user-info">
                        <img src={user_3} alt="" />
                        <div>
                            <h3>William Jackson</h3>
                            <span>Edusity, USA</span>
                        </div>
                    </div>
                    <p>
                        Choosing to pursue my degree at Edusity was one of the 
                        best decisions I've ever made. The supportive community, state-of-the-art facilites, and
                        commitment to academic excellence have truly exceeded my expectations.
                    </p>
                </div>
            </li>

 <li>
                <div className='slide'>
                    <div className="user-info">
                        <img src={user_4} alt="" />
                        <div>
                            <h3>William Jackson</h3>
                            <span>Edusity, USA</span>
                        </div>
                    </div>
                    <p>
                        Choosing to pursue my degree at Edusity was one of the 
                        best decisions I've ever made. The supportive community, state-of-the-art facilites, and
                        commitment to academic excellence have truly exceeded my expectations.
                    </p>
                </div>
            </li>
            
        
        </ul>
    </div>
   </div>
  )
}

export default Testimonials