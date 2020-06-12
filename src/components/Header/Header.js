import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo1.png';
import {connect} from 'react-redux';
import {signIn} from '../../redux/meInfoReducer';
import {signOut} from '../../redux/meInfoReducer';
import LinkBtn from '../common/Elems/LinkBtn';

let Header = (props) => {
	return  <header className={s.headerContainer}>
				<div className={s.header}>
					<div className={s.logo}><Link to="/feed"><img src={logo} alt="buddy" /></Link></div>
					<nav>
						{props.isLogin ? <ul className={s.nav}>
							<li><Link to={"/user/"+props.me}>Home</Link></li>
							<li><Link to="/feed">Feed</Link></li>
							<li><Link to="/messages">Messages</Link></li>
							<li><Link to="/search">Search</Link></li>
							<li><Link to="/setting">Setting</Link></li>
						</ul> : null}
					</nav>
					<div className={s.buttons}>
						{props.isLogin ? <LinkBtn font={14} fun={props.signOut} text="Logout" link="/login" /> : <LinkBtn font={14} text="Login" link="/login" />}
						{props.isLogin ? null : <LinkBtn name="blue" font={14} link="/signup" text="Sign Up" />}
					</div>
				</div>
			</header>
}
let mapStateToProps = (state) =>({
	isLogin: state.meInfo.isLogin,
	me: state.meInfo.id
})
let HeaderContainer = (props)=> {
	return <Header isLogin={props.isLogin} me={props.me} signIn={props.signIn} signOut={props.signOut} />
}
export default connect(mapStateToProps, {signIn,signOut})(HeaderContainer);