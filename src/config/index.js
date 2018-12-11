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
  View
} from 'react-native'

/**
 * @class
 * @classdesc 绑定redux组件
 */
export default class App extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <AppNavigationControl />
        </Provider>
      </View>
    )
  }
}
