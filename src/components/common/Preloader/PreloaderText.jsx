import React from 'react';
import s from './Preloader.module.css';


let PreloaderText = () => {
    return <div className={s.preloader}>
    			<p className={s.text}></p>
    			<p className={s.text}></p>
    			<p className={s.text}></p>
    			<p className={s.text}></p>
    			<p className={s.text}></p>
    		</div>
}
export default PreloaderText;