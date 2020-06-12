import React from 'react';
import s from './Form.module.css';
import FormInput from './FormInput';
import {Field, reduxForm} from 'redux-form';
import Button from '../Elems/Button';

let SearchForm = (props) => {
	return  <form onSubmit={props.handleSubmit} className={s.formAside}>
				<Field component={FormInput} name={'search'} type={"text"} placeholder="&#128269; search"/>
				<Button type="submit" text="Search" name="blue" font="13" />
			</form>
}
export default reduxForm({form: 'searchForm'})(SearchForm);