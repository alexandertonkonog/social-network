import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from './hoc/scrollToTop';

export const ContextReact = React.createContext();
	ReactDOM.render(
		<BrowserRouter>
			<ScrollToTop />
			<Provider store={store}>
				<App/>
			</Provider>	
		</BrowserRouter>
		, document.getElementById('root')
	);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
