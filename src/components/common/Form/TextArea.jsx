import React from 'react';
import s from './Form.module.css';
let TextArea = ({input, meta , ...props}) => {
	return  <div>
				<textarea {...props} className={s.textarea} {...input} placeholder={props.type==='text'? 'Your message': props.type } />
			</div>
}
export default TextArea;