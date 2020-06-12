import React from 'react';
import s from './Login.module.css'
import {signIn} from '../../redux/meInfoReducer';
import {redirect} from '../../redux/meInfoReducer';
import {connect} from 'react-redux';
import LoginForm from '../common/Form/LoginForm.js';
import {Link} from 'react-router-dom';

let Login = (props) => {
	let sendLogin = (values) => {
		props.signIn(values);
	}
	return  <div className={"wrapBlock loginSign "}>
				<h1>Login</h1>
				<LoginForm onSubmit={sendLogin} />
				{props.error ? <div className={s.error}>{props.error}</div> : null}
				<h4 className={s.orAction}>Если у Вас нет учетной записи <Link className={s.orLink} to="/signup">зарегистрируйтесь</Link>.</h4>
			</div>
}

let LoginContainer = (props)=> {
	return <Login fields={props.fields} error={props.error} signIn={props.signIn}  />
}
let mapStateToProps = (state) =>({
	error: state.meInfo.error
})


export default connect(mapStateToProps,{signIn})(LoginContainer);
