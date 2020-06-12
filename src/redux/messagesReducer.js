import axios from 'axios';


const GET_MESSAGES = 'GET_MESSAGES';
const getMessagesAC = (data) => ({type: GET_MESSAGES, data});
const GET_DIALOGS = 'GET_DIALOGS';
const getDialogsAC = (data) => ({type: GET_DIALOGS, data});
const ERROR_MESSAGES = 'ERROR_MESSAGES';
const errorMessagesAC = (data) => ({type: ERROR_MESSAGES, data});
const POST_MESSAGE = 'POST_MESSAGE';
const postMessageAC = (data) => ({type: POST_MESSAGE, data});

export let getMessages = (myId, userId) => (dispatch) => {
	axios.get( `http://127.0.0.1:3002/messages?myId=${myId}&userId=${userId}`)
		.then(res => {
			dispatch(getMessagesAC(res.data));
		})
		.catch();
}
export let getDialogs = (id) => (dispatch) => {
	axios.get( `http://127.0.0.1:3002/dialogs?id=${id}`)
		.then(res => {
			typeof res.data === 'object' ? dispatch(getDialogsAC(res.data)) : dispatch(errorMessagesAC(res.data))
		})
		.catch();
}
export let postMessage = (message) => (dispatch) => {
	if(message.text) {
		axios.post( 'http://127.0.0.1:3002/messages', message)
			.then(res => {
				dispatch(postMessageAC(res.data));
			})
			.catch();
	}	
}
let initialState = {
	dialogsList: null,
	dialog: null,
	error : null
}


export let messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MESSAGES: {
			return {
				...state, 
				dialog: action.data,
			}
		}
		case POST_MESSAGE: {
			return {
				...state,
				dialog: {
					...state.dialog,
					list: [
						...state.dialog.list, 
						action.data
					]
				}
			}
		}
		case GET_DIALOGS: {
			return {
				...state, 
				dialogsList: action.data,
			}
		}
		case ERROR_MESSAGES: {
			return {
				...state, 
				error: action.data,
				dialogsList: [],
			}
		}
		default: {
			return state;
		}
		
	}
}