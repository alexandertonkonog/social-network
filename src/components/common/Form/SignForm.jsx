import React from 'react';
import s from './Form.module.css';
import FormInput from './FormInput';
import {Field, reduxForm} from 'redux-form';
import {minLength, required} from '../../../validate/validate';
import Button from '../Elems/Button';

let SignForm = (props) => {
	return  <form onSubmit={props.handleSubmit} className={s.form+' '+s.loginSign}>
				<Field component={FormInput} placeholder="login" name={'login'} type={"text"} validate={[required, minLength]} />
				<Field component={FormInput} placeholder="name" name={'name'} type={"text"} validate={[required]} />
                <Field component={FormInput} placeholder="password" name={'password'} type={"password"} validate={[required, minLength]} />
				<Button name="blue" type="submit" font="14" width="100%" text="Sign up" pad="12" /> 
			</form>
}
export default reduxForm({form: 'signForm'})(SignForm);