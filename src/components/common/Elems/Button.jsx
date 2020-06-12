import React from 'react';
import s from './Elems.module.css';

let Button = props => {
	return <button 
				style={{fontSize: props.font+'px', width: props.width, padding: props.pad+'px'}} 
				type={props.type}  
				onClick={props.fun} 
				className={props.name ? s.btn+' '+s[props.name]: s.btn}
				disabled={props.disabled}>{props.text}</button>
}
export default Button;