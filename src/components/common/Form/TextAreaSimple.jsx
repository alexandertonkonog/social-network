import React from 'react';
import s from './Form.module.css';
let TextArea = (props) => {
	return  <textarea onChange={(e)=> props.fun(e.target.value)} value={props.value} className={s.textarea+' '+s.simpleTextarea} placeholder={props.placeholder} />
}
export default TextArea;