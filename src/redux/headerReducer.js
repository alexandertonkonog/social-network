const NEW_ACTION = 'NEW_ACTION';
export const getNewAction = (data) => ({type: NEW_ACTION, data});
let initialState = {
	data: []
}
export let headerReducer = (state=initialState, action) => {
	switch (action.type) {
		case NEW_ACTION: {
			return {
				...state, 
				data : action.data
			}
		}
		default: {
			return state;
		}
		
	}
}