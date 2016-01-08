import {CHANGE_STYLE_MODE,GET_INDEX_IMG,TAG_LIST,ARTICLE_LIST,ARTICLE_DETAIL,COMMENT_LIST,PRENEXT_ARTICLE, CHANGE_OPTIONS,ADD_ARTICLE_LIST,REQUEST_ARTICLE_LIST,GET_CAPTCHAURL,TOGGLE_LIKE,FAILURE_ADD_COMMENT,SUCCESS_ADD_COMMENT,FAILURE_ADD_REPLY,SUCCESS_ADD_REPLY} from './ActionTypes'
const API_ROOT = 'http://api.jackhu.top/'
import querystring from 'querystring'
import parseHtml from '../util/parseHtml'

/*获取文章列表*/
//初始文章列表
function receiveArticleList(json,isMore) {
	return {
	  type: ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//加载更多文章
function addArticleList(json,isMore) {
	return {
	  type: ADD_ARTICLE_LIST,
	  articleList: json.data,
	  isMore:isMore
	}
}
//发送请求
function requestArticleList() {
  return {
    type: REQUEST_ARTICLE_LIST
  }
}
export function getArticleList(isAdd = true) {
	return (dispatch,getState) => {
		dispatch(requestArticleList())
		const options = getState().options
		return fetch(API_ROOT + 'article/getFrontArticleList?' + querystring.stringify(options),{
			method: 'get',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			}
		})
		  .then(response => response.json())
		  .then(json => {
		  	const isMore = !(json.data.length < options.itemsPerPage)
		    return isAdd?dispatch(addArticleList(json,isMore)):dispatch(receiveArticleList(json,isMore))
		  })
		  .catch(err=>{
		  	//console.log(err)
		  })
		  .done()
	}
}
//获取文章详情
function receiveArticleDetail(article) {
	return {
		type: ARTICLE_DETAIL,
		articleDetail: article
	}
}

export function getArticleDetail(id) {
	return (dispatch, getState) => {
		const {auth} = getState()
		return fetch(API_ROOT + 'article/' + id + '/getFrontArticle')
		  .then(response => response.json().then(json=>({json,response})))
		  .then(({json,response}) => {
		  	let article = json.data
		  	if(response.ok){
		  		return parseHtml(article.content, (err, element) => {
		  		  if(err){
		  		  	article.content = ''
		  		 	}else{
		  		 		article.content = element
		  		 	}
		  		  return dispatch(receiveArticleDetail(article))
		  		});
		  	}
		  })
		  .catch(err=>{
		  	//console.log(err)
		  })
		  .done()
	}
}
//更改options
export function changeOptions(option) {
	return {
		type: CHANGE_OPTIONS,
		option: option
	}
}