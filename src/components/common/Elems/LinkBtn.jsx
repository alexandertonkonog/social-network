import React from 'react';
import s from './Elems.module.css';
import {Link} from 'react-router-dom';

let LinkBtn = props => {
	return <Link 
				style={{fontSize: props.font+'px', padding: props.pad+'px'}} 
				onClick={props.fun} 
				className={props.name ? s.btn+' '+s[props.name]: s.btn} 
				to={props.link}>{props.text}</Link>
}
export default LinkBtn;