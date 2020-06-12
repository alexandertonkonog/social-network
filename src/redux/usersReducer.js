import axios from 'axios';
import {mainSearch} from './globalFunctions';

const GET_USERS = 'GET_USERS';
const getUsersAC = (data) => ({type: GET_USERS, data});
const GET_GROUPS = 'GET_GROUPS';
const getGroupsAC = (data) => ({type: GET_GROUPS, data});
const GET_USER = 'GET_USER';
const getUserAC = (data) => ({type: GET_USER, data});
const GET_GROUP = 'GET_GROUP';
const getGroupAC = (data) => ({type: GET_GROUP, data});
const HAVE_ITEMS = 'HAVE_ITEMS';
const haveItemsAC = () => ({type: HAVE_ITEMS});
const LOADING = 'LOADING';
const loadingAC = (data) => ({type: LOADING, data});
const FILTER_USERS = 'FILTER_USERS';
const filterUsersAC = (data) => ({type: FILTER_USERS, data});
const FILTER_GROUPS = 'FILTER_GROUPS';
const filterGroupsAC = (data) => ({type: FILTER_GROUPS, data});


export let filterUser = (text, list) => (dispatch) => {
	if(!text){ 
		dispatch(filterUsersAC(list))
	}
	else {
		dispatch(filterUsersAC(mainSearch(text, list)));
	}	
}
export let filterGroup = (text, list) => (dispatch) => {
	if(!text){ 
		dispatch(filterGroupsAC(list))
	}
	else {
		dispatch(filterGroupsAC(mainSearch(text, list)));
	}	
}
export let getUsers = ()=> (dispatch) => {
	axios.get(`http://127.0.0.1:3002/users`)
		.then(res => {
			dispatch(getUsersAC(res.data));
			dispatch(haveItemsAC())
		})
		.catch();
}
export let getGroups = ()=> (dispatch) => {
	axios.get(`http://127.0.0.1:3002/groups`)
		.then(res => {
			dispatch(getGroupsAC(res.data));
			dispatch(haveItemsAC())
		})
		.catch();
}
export let getGroup = (id)=> (dispatch) => {
	axios.get( `http://127.0.0.1:3002/groups?&id=${id}`)
		.then(res => {
			dispatch(loadingAC(true));
			dispatch(getGroupAC(res.data));
			dispatch(loadingAC(false));
		})
		.catch();
}
export let getUser = (data) => (dispatch) => {
	axios.get( `http://127.0.0.1:3002/users?id=${data}`)
		.then(res => {
			dispatch(loadingAC(true));
			dispatch(getUserAC(res.data));
			dispatch(loadingAC(false));
		})
		.catch();
}

let initialState = {
	user: null,
	group: null,
	haveItems: false,
	users: null,
	groups: null,
	loading: false,
	filterUsersList: null,
	filterGroupsList: null
}

export let usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS: {
			return {
				...state, 
				users: action.data,
				filterUsersList: action.data
			}
		}
		case GET_GROUPS: {
			return {
				...state, 
				groups: action.data,
				filterGroupsList: action.data
			}
		}
		case HAVE_ITEMS: {
			if (state.users && state.groups) {
				return {
					...state,
					haveItems: true
				}
			} else {
				return {
					...state,
					haveItems: false
				}
			}
		}
		case GET_USER: {
			return {
				...state,
				user: action.data
			}
		}
		case GET_GROUP: {
			return {
				...state,
				group: action.data
			}
		}
		case LOADING: {
			return {
				...state,
				loading: action.data
			}
		}
		case FILTER_USERS: {
			return {
				...state,
				filterUsersList: action.data,
			}
		}
		case FILTER_GROUPS: {
			return {
				...state,
				filterGroupsList: action.data,
			}
		}
		default: {
			return state;
		}
		
	}
}