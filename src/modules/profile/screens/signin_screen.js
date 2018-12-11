/**
 * 登录界面
 * 2018-12-11 10:18
 * @author koohead
 * @description 注册界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

/**
 * @class
 * @classdesc 登录界面
 * @description 登录界面
 */
class SigninScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigation.goBack(null)
          }}
        >登录界面</Text>
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

export default SigninScreen
