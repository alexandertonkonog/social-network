import React from 'react';
import s from './Preloader.module.css';
import logo from '../../../images/gif.gif'

let Preloader = () => {
    return <div className={s.preloader}><img src={logo} alt="loading"/></div>
}
export default Preloader;