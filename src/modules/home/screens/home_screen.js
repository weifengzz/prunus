/**
 * 引导界面
 * 2018-12-11 09:51
 * @author koohead
 * @description 主页面
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  SplashScreen
} from '../../../components'

/**
 * @class
 * @classdesc 主界面
 * @description 主界面
 */
class HomeScreen extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigation.navigate('signin')
          }}
        >首页</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen
