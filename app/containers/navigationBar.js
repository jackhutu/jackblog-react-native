const React = require('react-native')
const {
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} = React
const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#e78170',
  },
  navBarItem:{
    flex:1,justifyContent:'center'
  },
  navBarTitle:{
    width:(width - 144),alignItems:'center',
  },
  navBarText: {
    color: 'white',
    fontSize: 18,
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
})

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={[styles.navBarItem,styles.navBarLeftButton]}>
        <Text style={[styles.navBarText]}>
          {'< '}Back
        </Text>
      </TouchableOpacity>
    )
  },

  RightButton: function(route, navigator, index, navState) {
    return null
  },

  Title: function(route, navigator, index, navState) {
    return (
      <View style={[styles.navBarItem,styles.navBarTitle]}>
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
      </View>
    );
  },
}
export default (
  <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={NavigationBarRouteMapper} />
)

