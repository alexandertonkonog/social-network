import React from 'react';
import s from './Elems.module.css';
import {Link} from 'react-router-dom';

let LinLink = props => {
	return <li><Link 
				style={{fontSize: props.font+'px', padding: props.pad+'px'}} 
				onClick={props.fun} 
				className={props.name ? s.li+' '+s[props.name]: s.li} 
				to={props.link}>{props.text}</Link></li>
}
export default LinLink;