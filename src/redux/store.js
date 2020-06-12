import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {headerReducer} from './headerReducer.js';
import {usersReducer} from './usersReducer.js';
import {meInfoReducer} from './meInfoReducer.js';
import {articleReducer} from './articleReducer.js';
import {featureReducer} from './featureReducer.js';
import { sliderReducer } from './sliderReducer.js';
import { actionReducer } from './actionReducer.js';
import { messagesReducer } from './messagesReducer.js';
import {reducer as formReducer} from 'redux-form';


let reducers = combineReducers({
	header: headerReducer,
	users: usersReducer,
	meInfo: meInfoReducer,
	articles: articleReducer,
	sliders: sliderReducer,
	actions: actionReducer,
	features: featureReducer,
	form : formReducer,
	messages: messagesReducer
});
let store = createStore(reducers,applyMiddleware(thunk));
window.store = store;
export default store;