import axios from 'axios';
import {mainSearch} from './globalFunctions';

const GET_ARTICLES = 'GET_ARTICLES';
export const getArticlesAC = (data) => ({type: GET_ARTICLES, data});
const GET_ARTICLE = 'GET_ARTICLE';
export const getArticleAC = (data) => ({type: GET_ARTICLE, data});
const HAVE_ARTICLES = 'HAVE_ARTICLES';
export const haveArticlesAC = (data) => ({type: HAVE_ARTICLES, data});
const FILTER_ARTICLES = 'FILTER_ARTICLES';
export const filterArticlesAC = (data) => ({type: FILTER_ARTICLES, data});
const ADD_COMMENT = 'ADD_COMMENT';
export const addCommentAC = (data) => ({type: ADD_COMMENT, data});
const POST_ARTICLE = 'POST_ARTICLE';
export const postArticleAC = (data) => ({type: POST_ARTICLE, data});


export let getArticles = () => (dispatch) => {
	axios.get('http://127.0.0.1:3002/articles')
		.then(res => {
			dispatch(getArticlesAC(res.data));
			dispatch(haveArticlesAC(true));
		})
}
export let commentArticle = (data) => (dispatch) => {
	
	axios.post('http://127.0.0.1:3002/articles', data)
		.then(res => {
			debugger
			dispatch(addCommentAC(res.data));
		})
} 
export let getArticle = (id) => (dispatch) => {
	axios.get(`http://127.0.0.1:3002/articles?id=${id}`)
		.then(res => {
			dispatch(getArticleAC(res.data));
		})
}   
export let filterArticle = (text, list) => (dispatch) => {
	if(!text){ 
		dispatch(filterArticlesAC(list))
	}
	else {
		dispatch(filterArticlesAC(mainSearch(text, list)));
	}	
}
export let postArticle = (data) => (dispatch) => {
	debugger
	axios.post('http://127.0.0.1:3002/article/create', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(res => {
			debugger
		})
}


let initialState = {
	article: null,
	list: null,
	haveArticles: false,
	filterList: null
}


export let articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ARTICLES: {
			return {
				...state,
				list: action.data,
				filterList: action.data
			};
		}
		case GET_ARTICLE: {
			return {
				...state,
				article: action.data
			};
		}
		case HAVE_ARTICLES: {
			return {
				...state,
				haveArticles: action.data
			};
		}
		case FILTER_ARTICLES: {
			return {
				...state,
				filterList: action.data
			};
		}
		case ADD_COMMENT: {
			return {
				...state,
				article: {
					...state.article,
					comments: [
						...state.article.comments,
						action.data
					]
				}
			};
		}
		default: {
			return state;
		}
		
	}
}