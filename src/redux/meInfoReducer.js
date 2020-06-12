import axios from 'axios';
import React from 'react';

const SIGN = 'SIGN';
export const signAC = (data) => ({type: SIGN, data});
const SIGN_OUT ='SIGN_OUT';
export const signOutAC = (data) => ({type: SIGN_OUT, data});
const CHANGE_SETTING = 'CHANGE_SETTING';
export const changeSettingAC = (data) => ({type: CHANGE_SETTING, data});
const ADD_FRIEND = 'ADD_FRIEND';
export const addFriendAC = (data) => ({type: ADD_FRIEND, data});
const ADD_GROUP = 'ADD_GROUP';
export const addGroupAC = (data) => ({type: ADD_GROUP, data});
const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const removeFriendAC = (data) => ({type: REMOVE_FRIEND, data});
const REMOVE_GROUP = 'REMOVE_GROUP';
export const removeGroupAC = (data) => ({type: REMOVE_GROUP, data});
const LOADING_FOLLOW = 'LOADING_FOLLOW';
export const loadingFollowAC = (data, id) => ({type: LOADING_FOLLOW, data, id});
const HAVE_CHANGED = 'HAVE_CHANGED';
export const haveChangedAC = (status) => ({type: HAVE_CHANGED, status});
const CHANGE_AVATAR = 'CHANGE_AVATAR';
export const changeAvatarAC = (data) => ({type: CHANGE_AVATAR, data});
const IS_KEY_CHECKED = 'IS_KEY_CHECKED';
export const changeKeyCheckedAC = (data) => ({type: IS_KEY_CHECKED, data});

let deleteCookie =  name => {
 	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

let initialState = {
	isLogin : false,
	id: null,
	data: null,
	error: false,
	loading: [],
	haveChanged: false,
	isKeyChecked: false
}

export let register = (data) => (dispatch) => {
	axios.post('http://127.0.0.1:3002/signup', data)
		.then(res => {
			dispatch(changeKeyCheckedAC(true));
			if (!res.data.success) {
				let obj = {isLogin: false, data: null, error: res.data.error, id: null};
				dispatch(signAC(obj));
			} 
			else {
				let obj = {isLogin: true, data: res.data.data, error: false, id:res.data.data.id };
				dispatch(signAC(obj));
				document.cookie = 'api-key='+res.data.key;
			}
		})
}

export let sendSetting = (data) => (dispatch) => {
	dispatch(haveChangedAC(false));
	axios.post('http://127.0.0.1:3002/setting', data)
		.then(res => {
			dispatch(changeSettingAC(res.data));
			dispatch(haveChangedAC(true));
		})
}

export let signIn = (data) => (dispatch) => {
	axios.post('http://127.0.0.1:3002/login', data)
		.then(res => {
			dispatch(changeKeyCheckedAC(true));
			if(res.data.success){
				let obj = {isLogin: true, data: res.data.data, error: false, id:res.data.data.id};
				dispatch(signAC(obj));
				document.cookie = 'api-key='+res.data.key;
			}
			else {
				let obj = {isLogin: false, data: null, error: res.data.error, id: null};
				dispatch(signAC(obj));
			}
		})
}

export let signOut = (data) => (dispatch) => {
	axios.get('http://127.0.0.1:3002/logout')
		.then(res => {
			let obj = {isLogin: false, data: null, error: false, id: null};
			dispatch(signOutAC(obj));
			deleteCookie('api-key');
		})
}

export let addFriend = (id, userId) => (dispatch) => {
	dispatch(haveChangedAC(false));
	dispatch(loadingFollowAC(true, userId));
	axios.get(`http://127.0.0.1:3002/user/follow?id=${id}&userId=${userId}`)
		.then(res => {
			if(res.data.success) dispatch(addFriendAC(res.data));
			dispatch(loadingFollowAC(false, userId));
			dispatch(haveChangedAC(true));

		})
}

export let addGroup = (id, userId) => (dispatch) => {
	dispatch(haveChangedAC(false));
	dispatch(loadingFollowAC(true, userId));
	axios.get(`http://127.0.0.1:3002/group/follow?id=${id}&userId=${userId}`)
		.then(res => {
			if(res.data.success) dispatch(addGroupAC(res.data));
			dispatch(loadingFollowAC(false, userId));
			dispatch(haveChangedAC(true));
		})
}

export let removeGroup = (id, userId) => (dispatch) => {
	dispatch(haveChangedAC(false));
	dispatch(loadingFollowAC(true, userId));
	axios.get(`http://127.0.0.1:3002/group/follow?id=${id}&userId=${userId}&remove=true`)
		.then(res => {
			if(res.data.success) dispatch(removeGroupAC(res.data));
			dispatch(loadingFollowAC(false, userId));
			dispatch(haveChangedAC(true));
		})
}
export let changeKeyChecked = (status) => (dispatch) => {
	dispatch(changeKeyCheckedAC(status));
}
export let removeFriend = (id, userId) => (dispatch) => {
	dispatch(haveChangedAC(false));
	dispatch(loadingFollowAC(true, userId));
	axios.get(`http://127.0.0.1:3002/user/follow?id=${id}&userId=${userId}&remove=true`)
		.then(res => {
			if(res.data.success) dispatch(removeFriendAC(res.data));
			dispatch(loadingFollowAC(false, userId));
			dispatch(haveChangedAC(true));
		})
}

export let getAuth = (key) => (dispatch) => {
	axios.post(`http://127.0.0.1:3002/auth`, {key: key})
		.then(res => {
			dispatch(changeKeyCheckedAC(true));
			if (!res.data.success) {
				let obj = {isLogin: false, data: null, error: res.data.error, id: null};
				dispatch(signAC(obj));
			} 
			else {
				let obj = {isLogin: true, data: res.data.data, error: false, id:res.data.data.id};
				dispatch(signAC(obj));
			}
		})
}
export let changeAvatar = (data) => (dispatch) => {
	dispatch(haveChangedAC(false));
	axios.post('http://127.0.0.1:3002/setting', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(res => {
			dispatch(changeAvatarAC(res.data.data));
			dispatch(haveChangedAC(true));
		})
}
export let meInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN: {
			return {
				...state,
				isLogin: action.data.isLogin,
				id: action.data.id,
				data: action.data.data,
				error: action.data.error
			}
		}
		case SIGN_OUT: {
			return {
				...state,
				isLogin: action.data.isLogin,
				id: action.data.data,
				data: action.data.data,
				error: action.data.error
			}
		}
		case CHANGE_SETTING: {
			return {
				...state,
				data: action.data,
			}
		}
		case ADD_FRIEND: {
			return {
				...state,
				data: {
					...state.data,
					friends: [...state.data.friends, action.data.id]
				},
			}
		}
		case ADD_GROUP: {
			return {
				...state,
				data: {
					...state.data,
					follow: [...state.data.follow, action.data.id]
				},
			}
		}
		case REMOVE_FRIEND: {
			return {
				...state,
				data: {
					...state.data,
					friends: action.data.arr
				},
			}
		}
		case REMOVE_GROUP: {
			return {
				...state,
				data: {
					...state.data,
					follow: action.data.arr
				},
			}
		}
		case LOADING_FOLLOW: {
			return {
				...state,
				loading: action.data ? [...state.loading, action.id] :
				state.loading.filter(item => item !== action.id)
			}
		}
		case HAVE_CHANGED: {
			return {
				...state,
				haveChanged: action.status
			}
		}
		case CHANGE_AVATAR: {
			return {
				...state,
				data: action.data
			}
		}
		case IS_KEY_CHECKED: {
			return {
				...state,
				isKeyChecked: action.data
			}
		}
		default: {
			return state;
		}
		
	}
}