import React from 'react';
import s from './Form.module.css';
let SelectInput = (props) => {
	debugger
	return  <div className={s.inputContainer}>
				<select size="1" className={s.input} type={props.type} placeholder={props.placeholder} >
					<option value='dsdsd'>ghgh</option>
				</select>
			</div>
}
export default SelectInput;