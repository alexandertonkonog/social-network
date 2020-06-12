const NEW_ACTION = 'NEW_ACTION';
export const getNewAction = () => ({type: NEW_ACTION});
let initialState = {
	list: [
		{
			id: 1,
			name: 'Professionally pursue world-class applications',
			img: 'https://buddy.ghostpool.com/wp-content/uploads/photodune-3443609-head-the-girl-computer-s-340x260.jpg'
		},
		{
			id: 2,
			name: 'Holisticly evolve highly efficient',
			img: 'https://buddy.ghostpool.com/wp-content/uploads/photodune-3382898-computer-tree2-s-340x260.jpg'
		},
		{
			id: 3,
			name: 'Professionally drive ubiquitous technology',
			img: 'https://buddy.ghostpool.com/wp-content/uploads/photodune-3382850-computer3-s-340x260.jpg'
		},
		{
			id: 4,
			name: 'Uniquely promote resource-leveling platforms',
			img: 'https://buddy.ghostpool.com/wp-content/uploads/photodune-2445190-hand-office2-s-340x260.jpg'
		},
	]
		
}



export let featureReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_ACTION: {
			return state;
		}
		default: {
			return state;
		}
		
	}
}