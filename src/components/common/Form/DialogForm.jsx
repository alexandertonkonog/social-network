import React from 'react';
import s from './Form.module.css';
import TextArea from './TextArea';
import {Field, reduxForm} from 'redux-form';
import Button from '../Elems/Button';

let DialogForm = (props) => {
	return  <form onSubmit={props.handleSubmit} className={s.formText}>
				<div className={s.textForm}> 
					<Field component={TextArea} name={'message'} type={"text"} placeholder="your message" />
					<Button name="blue" type="submit" text="Send" />
				</div>
			</form>
}
export default reduxForm({form: 'dialogForm'})(DialogForm);