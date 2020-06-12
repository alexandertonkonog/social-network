import React from 'react';
import s from './Elems.module.css';
import {Link} from 'react-router-dom';

let Tag = props => {
	return <Link 
				style={{fontSize: props.font+'px'}} 
				onClick={props.fun} 
				className={props.name ? s.tag+' '+s[props.name]: s.tag} 
				to={props.link}>{props.text}</Link>
}
export default Tag;