import axios from 'axios';

const GET_ACTIONS = 'GET_ACTIONS';
export const getActionsAC = (data) => ({type: GET_ACTIONS, data});
const HAVE_ACTIONS = 'HAVE_ACTIONS';
export const haveActionsAC = (data) => ({type: HAVE_ACTIONS, data});
const GET_USER_ACTIONS = 'GET_USER_ACTIONS';
export const getUserActionsAC = (data) => ({type: GET_USER_ACTIONS, data});
const GET_GROUP_ACTIONS = 'GET_GROUP_ACTIONS';
export const getGroupActionsAC = (data) => ({type: GET_GROUP_ACTIONS, data});

export let getActions = () => (dispatch) => {
    axios.get('http://127.0.0.1:3002/actions')
        .then(res => {
            dispatch(getActionsAC(res.data));
            dispatch(haveActionsAC(true))
        })
        .catch();
}
export let getUserActions = (data) => (dispatch) => {
    axios.get(`http://127.0.0.1:3002/actions?id=${data}`)
        .then(res => {
            dispatch(getUserActionsAC(res.data));
        })
        .catch();
}
export let getGroupActions = (id) => (dispatch) => {
    axios.get(`http://127.0.0.1:3002/actions?group=true&id=${id}`)
        .then(res => {
            dispatch(getGroupActionsAC(res.data));
        })
        .catch();
}





let initialState = {
    //actionCode 1 - post, 2 - follow, 3 - post in group, 4 - update post, 5 - comment
	list : [],
    haveActions: false,
    userActions: [],
    groupActions: []
}


export let actionReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACTIONS: {
			return {
                ...state,
                list: action.data
            };
		}
        case HAVE_ACTIONS: {
            return {
                ...state,
                haveActions: action.data
            };
        }
        case GET_USER_ACTIONS: {
            return {
                ...state,
                userActions: action.data
            };
        }
        case GET_GROUP_ACTIONS: {
            return {
                ...state,
                groupActions: action.data
            };
        }
		default: {
			return state;
		}
		
	}
}