const React = require('react-native')
const {
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} = React

export default class Article extends Component {
	constructor(props){
		super(props)
	}
  componentDidMount() {
    const { actions,aid,articleDetail } = this.props
    if(aid){
      //获取文章详情
      actions.getArticleDetail(aid)
    }
  }

  render() {
    const { articleDetail } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{articleDetail.title}</Text>
        {articleDetail.content}
      </ScrollView>
    )
  }
}

const fontSize = 16
const titleMargin = 10
const liFontSize = fontSize - 2
const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:64,
    paddingLeft: 10,
    paddingRight:10,
  },
  title:{
    marginTop:10,
    fontSize: liFontSize * 2,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36
  }
})