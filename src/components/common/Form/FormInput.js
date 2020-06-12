import React from 'react';
import s from './Form.module.css';
let FormInput = ({input, meta, ...props}) => {
	return  <div className={s.inputContainer}>
				<input {...props} className={s.input} {...input} placeholder={props.placeholder} />
				{meta.touched && meta.error && <p className={s.error}>{meta.error}</p>}
			</div>
}
export default FormInput;