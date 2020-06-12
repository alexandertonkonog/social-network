import React, {useState} from 'react';
import st from './Slider.module.css';


let Slider = ({slider}) => {
  let [slide, setSlide] = useState(0);
  return  <div className={st.Slider}>
            <div key={slider[slide].id+'slide'} className={st.slide} style={{backgroundImage: `url(${slider[slide].img})`}}>
              <div className={st.select}>
                  {slider.map((s,index) => {
                      return index===slide ? 
                      <div key={slider[slide].id+'circle'} className={st.circleSelect+' '+st.circleActive}></div> : 
                      <div key={slider[slide].id+'circle'} className={st.circleSelect} onClick={()=>{setSlide(index)}} ></div>
                  })}
              </div>
              {slider[slide].title ? <div className={st.title}>{slider[slide].title}</div> : null }
            </div>
          </div>
}
export default Slider;