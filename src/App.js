import React, {useEffect, useState} from 'react';
import './App.css';
import {connect} from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import Main from './components/Main/Main.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import {getAuth, changeKeyChecked} from './redux/meInfoReducer';
let App = (props) => {
	let getCookie = name => {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};
	useEffect(()=>{
		if(getCookie('api-key')) {
			props.getAuth(getCookie('api-key'));
		} else {
			props.changeKeyChecked(true)
		}
	}, [props.isKeyChecked])
	
	console.log(getCookie('user'))
	return  <div className="fullPage">
				<div className="mainContent">
					<Header />
					{props.isKeyChecked ? <Main /> : <div className="preloaderZone"><Preloader /></div>}
				</div>
				<Footer />
			</div>
}
let mapStateToProps = (state) => ({
	isKeyChecked: state.meInfo.isKeyChecked
})
export default connect(mapStateToProps, {getAuth, changeKeyChecked})(App);