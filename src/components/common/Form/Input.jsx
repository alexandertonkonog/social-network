import React from 'react';
import s from './Form.module.css';
let Input = (props) => {
	return  <input 
		name={props.name} 
		className={s.input + ' ' + s.simpleInput} 
		placeholder={props.placeholder} 
		value={props.value} 
		onChange={(e)=> props.fun(e.target.value)} />		
}
export default Input;