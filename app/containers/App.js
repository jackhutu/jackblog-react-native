const React = require('react-native')
const {
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Home from '../components/home'
import NavigationBar from './navigationBar'

class App extends Component {
  constructor(props){
    super(props)
    this.renderScene = this.renderScene.bind(this)
  }
  renderScene (route, nav) {
    let Component = route.component;
    if(route.component) {
      return <Component {...this.props} {...route.params} navigator={nav} />
    }
  }
  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        initialRoute={{ component: Home, title:"Jack's blog"}}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={NavigationBar}
        />
    )
  }
}



function mapStateToProps(state) {
  return {
    articleList: state.articleList,
    articleDetail: state.articleDetail,
    options: state.options
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)


// class App extends Component {
//   render() {
//     const {actions} = this.props
//     return (
//       <NavigatorIOS
//         barTintColor='blue'   //导航条的背景颜色。
//         tintColor='#FF6600'  //导航栏上按钮的颜色。
//         titleTextColor='#FF6600'    //导航器标题的文字颜色。
//         //translucent='true'   //一个布尔值，决定是否导航条是半透明的。
//         //shadowHidden='true'   //一个布尔值，决定是否要隐藏1像素的阴影
//         initialRoute={{
//           title: "Jack's blog",
//           component: Home,
//           passProps: this.props,
//         }}/>
//     )
//   }
// }