import React from 'react';
import s from './Login.module.css'
import {register} from '../../redux/meInfoReducer';
import {connect} from 'react-redux';
import SignForm from '../common/Form/SignForm';
import {Link} from 'react-router-dom';

let SignUp = (props) => {
	let sendSign = (values) => {
		props.register(values);
	}
	return  <div className={"wrapBlock loginSign "}>
				<h1>Sign Up</h1>
				<SignForm onSubmit={sendSign} />
				{props.error ? <div className={s.error}>{props.error}</div> : null}
                <h4 className={s.orAction}>Если у Вас есть учетная запись <Link className={s.orLink} to="/login">войдите в нее</Link>.</h4>
			</div>
}

class SignContainer extends React.Component {
	render () {
		return <SignUp checkArr={this.props.arr} fields={this.props.fields} error={this.props.error} register={this.props.register} />
	}
}
let mapStateToProps = (state) =>({
	fields: state.form,
	error: state.meInfo.error,
	arr: state.meInfo.arr
})


export default connect(mapStateToProps,{register})(SignContainer);