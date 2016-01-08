const React = require('react-native')
const {
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Dimensions,
  ActivityIndicatorIOS
} = React
import {customTime} from '../util/date'
import Article from './article'
import RefreshInfiniteListView from '../util/refreshInfinite'
const LISTVIEW_REF = 'listview'
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Home extends Component {
	constructor(props){
		super(props)
		this._handleLinkToArticle = this._handleLinkToArticle.bind(this)
		this._renderRow = this._renderRow.bind(this)
		this._onInfinite = this._onInfinite.bind(this)
		this._onRefresh = this._onRefresh.bind(this)
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

	componentDidMount() {
	  const { actions,articleList } = this.props
	  if(articleList.items.length < 1){
	    actions.getArticleList()
	  }
	}
	_renderRow (rowData: string, sectionID: number, rowID: number) {
	  return (
	  	<TouchableOpacity onPress={e=>this._handleLinkToArticle(e,rowData._id)}>

	  	<View style={styles.artilceItem}>
	  		<View style={styles.articleLeft}>
	  			<Text style={[styles.articleSpan]}>{customTime(rowData.publish_time)}</Text>
	  			<Text style={[styles.articleSpan,styles.articleTitle]} numberOfLines={1}>{rowData.title}</Text>
					<Text style={styles.articleCount}>阅读 {rowData.visit_count} · 评论 {rowData.comment_count}· 喜欢 {rowData.like_count}</Text>
	  		</View>
	  		{rowData.images.length > 0 && 
	  			<View style={styles.wrapImg}>
	  			<Image
	  				resizeMode={'stretch'}
	  				style={styles.articleImg}
	  			  source={{uri: rowData.images[0].url + '?imageView2/2/w/100/h/100'}}
	  			/>
	  			</View>}

    	</View>
    	</TouchableOpacity>
	  );
	}

	_onInfinite() {
		const { actions,options,articleList } = this.props
		if(articleList.isMore && !articleList.isFetching){
			actions.changeOptions({'currentPage':++options.currentPage})
			actions.getArticleList()
		}else{
			this.refs[LISTVIEW_REF].hideFooter()
		}
	}

	_onRefresh(){
		const { actions,articleList } = this.props
		actions.changeOptions({'currentPage':1})
		actions.getArticleList(false)
	}
	_renderEmptyRow(){
		return (
		    <View style={{height:Dimensions.get('window').height*2/3, justifyContent:'center',alignItems:'center'}}>
		    <ActivityIndicatorIOS
		        size='large'
		        animating={true}/>
		    </View>
		)
	}
	componentDidUpdate(){
		this.refs[LISTVIEW_REF].hideFooter()
		this.refs[LISTVIEW_REF].hideHeader()
	}

  render() {
  	const { actions,articleList } = this.props
    return (
    	<View style={styles.container}>
	    	<RefreshInfiniteListView
	    		style={styles.articleList}
	    		ref = {LISTVIEW_REF}
	    		dataSource={ds.cloneWithRows(articleList.items)}
	    		renderRow={this._renderRow}
	    		onRefresh = {this._onRefresh}
	    		onInfinite = {this._onInfinite}
	    		initialListSize={10}
	    		scrollEventThrottle={10}
	    		scrollLoadHeight={200}
	    		enableScrollLoad={true}
	    		isMoreData={articleList.isMore}
	    		renderEmptyRow={this._renderEmptyRow}
	    	/>
	    	{articleList.isFetching && articleList.items.length > 0 &&
	    		<View style={{height:50, justifyContent:'center', alignItems:'center'}}>
	    	    <ActivityIndicatorIOS
	    	        size='small'
	    	        animating={true}/>
	    		</View>}
    	</View>

    )
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#fff',
		marginTop: 64,
		paddingLeft:10,
		paddingRight: 10,
	},
	articleList:{
		paddingTop:10
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
		//fontFamily: 'Verdana'
	}
})