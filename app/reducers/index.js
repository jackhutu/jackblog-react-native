import {ARTICLE_LIST,ARTICLE_DETAIL,PRENEXT_ARTICLE,ADD_ARTICLE_LIST,REQUEST_ARTICLE_LIST,TOGGLE_LIKE,CHANGE_OPTIONS} from '../actions/ActionTypes'
import { combineReducers } from 'redux'

export function articleList(state={
	isFetching: false,
	isMore: true,
	items: []
}, action) {
	switch(action.type){
		case REQUEST_ARTICLE_LIST:
		return {...state,isFetching:true}
		case ARTICLE_LIST:
		return Object.assign({},{
			isFetching: false,
			isMore: action.isMore,
			items:action.articleList
		})
		case ADD_ARTICLE_LIST:
		return Object.assign({},{
		  isFetching: false,
		  isMore: action.isMore,
		  items: [...state.items,...action.articleList]
		})
		default: 
		return state
	}
}

function articleDetail(state={}, action) {
	switch(action.type){
		case ARTICLE_DETAIL:
		return {...action.articleDetail}
		case TOGGLE_LIKE:
		return {...state, isLike:action.isLike, like_count:action.like_count}
		default:
		return state
	}
}

function options(state = {currentPage: 1, itemsPerPage: 7,sortName:'publish_time',tagId: ''}, action) {
	switch(action.type){
		case CHANGE_OPTIONS:
		return Object.assign({},state,action.option)
		default: 
		return state
	}
}

const rootReducer = combineReducers({
	articleList,
	articleDetail,
	options
})

export default rootReducer
