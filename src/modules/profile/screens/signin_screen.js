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
  Text,
  StatusBar
} from 'react-native'
import setStackOptions from '../../../config/stackNavigatorOptions'
import commonStyles from '../../../styles'

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
        <StatusBar barStyle={'dark-content'} />
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

SigninScreen.navigationOptions = props => {
  const { navigation } = props
  return setStackOptions({
    navigation: navigation,
    title: '登录',
    autoHeaderLeft: true,
    autoHeaderRight: true,
    backgroundColor: 'white',
    titleColor: commonStyles.textDarkColor.color,
    headerLeftColor: commonStyles.textDarkColor.color,
    borderBottomWidth: 0.5,
    leftIconName: 'close',
    leftIconType: 'evil_icon',
    leftIconSize: 26
  })
}

export default SigninScreen
