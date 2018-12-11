/**
 * 引导界面
 * 2018-12-11 09:49
 * @author koohead
 * @description 引导界面
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
 * @classdesc 引导页
 * @description 引导页
 */
class GuideScreen extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigation.navigate('main')
          }}
        >引导页</Text>
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

export default GuideScreen
