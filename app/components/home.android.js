const React = require('react-native');
const {
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid,
  Text,
  TouchableOpacity,
  View,
  Image,
  Component,
  ListView,
  ActivityIndicatorIOS,
} = React;
import {customTime} from '../util/date'
import Article from './article'

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#fff',
		marginTop: 56,
	},
	articleList:{
		flex:1,
		paddingTop:10,
		paddingLeft:10,
		paddingRight: 10,
	},
	artilceItem:{
		borderBottomWidth: 1,
		borderBottomColor: '##d9d9d9',
		borderStyle:'dashed',
		marginBottom: 17,
		paddingBottom:17,
		flexDirection: 'row',
	},
	articleLeft:{
		flex:1,
		height: 100,
	},

	wrapImg:{
		width: 100,
		alignSelf:'flex-end'
	},
	articleImg:{
		width: 100,
		height: 100,
	},
	articleSpan:{
		flex:1,
		paddingRight: 5,
	},
	articleTitle:{
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 'bold',
		color: 'black',
	}
})
class Row extends Component{
  render () {
  	const {key,data,linkToArticle} = this.props
    return (
	    <TouchableOpacity onPress={e=>linkToArticle(e,data._id)} >
	     	<View style={styles.artilceItem}>
	     		<View style={styles.articleLeft}>
	     			<Text style={[styles.articleSpan]}>{customTime(data.publish_time)}</Text>
	     			<Text style={[styles.articleSpan,styles.articleTitle]} numberOfLines={1}>{data.title}</Text>
	    			<Text style={styles.articleCount}>阅读 {data.visit_count} · 评论 {data.comment_count}· 喜欢 {data.like_count}</Text>
	 				</View>
	     		{data.images.length > 0 && 
	     	  	<View style={styles.wrapImg}>
	     	  			<Image
	     	  				resizeMode={'stretch'}
	     	  				style={styles.articleImg}
	     	  			  source={{uri: data.images[0].url + '?imageView2/2/w/100/h/100'}}
	     	  			/>
	     	  	</View>}

	      </View>
	    </TouchableOpacity>
    )
  }
}

export default class Home extends Component{
	constructor(props){
		super(props)
		this._onInfinite = this._onInfinite.bind(this)
		this._handleLinkToArticle = this._handleLinkToArticle.bind(this)
		this._onRefresh = this._onRefresh.bind(this)
	}
  componentDidMount(){
  	const { actions,articleList } = this.props
  	if(articleList.items.length < 1){
  	  actions.getArticleList()
  	}
  }
	_handleLinkToArticle (e,aid) {
		e.preventDefault()
		const { navigator } = this.props;
	  if(navigator && aid) {
	      navigator.push({
	          title: "Jack's blog",
	          component: Article,
	          params:{
	          	aid:aid
	          }
	      })
	  }
	}
	_onInfinite(e){
		const ThresholdHight = 150
		const { actions,articleList,options } = this.props
		let nativeEvent = e.nativeEvent
		let yOffset = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
		nativeEvent.layoutMeasurement.height-nativeEvent.contentSize.height;
		if(Math.abs(yOffset) < ThresholdHight && articleList.isMore && !articleList.isFetching){
			actions.changeOptions({'currentPage':++options.currentPage})
			actions.getArticleList()
		}
	}
  _onRefresh() {
		const { actions,articleList } = this.props
		actions.changeOptions({'currentPage':1})
		actions.getArticleList(false)
  }
  render() {
  	const {articleList} = this.props 
    const rows = articleList.items.map((row, ii) => {
      return <Row key={ii} data={row} linkToArticle={this._handleLinkToArticle} />;
    });
    return (
      <PullToRefreshViewAndroid
        style={styles.container}
        refreshing={articleList.isFetching}
        onRefresh={this._onRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={'#eeeeee'}
        >
        <ScrollView 
        	style={styles.articleList} 
        	scrollEventThrottle={10}
        	onScroll={this._onInfinite}>
          {rows}
          {!articleList.isMore && articleList.items.length > 0 &&
          	<View style={{height:50, justifyContent:'center', alignItems:'center'}}>
          	    <Text style={styles.articleTitle}>
          	        没有更多文章了...
          	    </Text>
          	</View>
          }
        </ScrollView>
      </PullToRefreshViewAndroid>
    )
  }

}

