/**
 * 配置入口
 * 2018-12-11 11:30
 * @author koohead
 * @description 配置入口
 */

import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux'
import AppNavigationControl from './appNavigationControl'
import {
  View,
  StatusBar,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  YellowBox
} from 'react-native'

const IS_ANDROID = Platform.OS === 'android'

/**
 * @class
 * @classdesc 绑定redux组件
 */
export default class App extends Component {
  constructor (props) {
    super(props)
    // 屏蔽循环引用警告（由rn-fetch-blob 引发）
    YellowBox.ignoreWarnings([
      'Require cycle:'
    ])
  }
  async componentDidMount () {
    if (IS_ANDROID) {
      // 判断用户是否有存储权限权限
      if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) {
        // this.dowload()
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              'title': '申请空间存储权限',
              'message': '请开通空间存储权限，否则应用部分功能无法正常使用！'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          } else {
            ToastAndroid.show('请开通空间存储权限，否则应用部分功能无法正常使用！', ToastAndroid.SHORT)
          }
        } catch (err) {
          ToastAndroid.show('请开通空间存储权限，否则应用部分功能无法正常使用！', ToastAndroid.SHORT)
        }
      }
    }
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <AppNavigationControl />
        </Provider>
        <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
      </View>
    )
  }
}
