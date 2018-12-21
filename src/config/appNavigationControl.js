/**
 * 返回键状态管理
 * 2018-12-11 11:27
 * @author koohead
 * @description 返回键状态管理
 */

import React, { Component } from 'react'
import AppWithNavigationState from './appWithNavigationState'
import { connect } from 'react-redux'
import {
  BackHandler,
  Platform,
  ToastAndroid,
  AppState,
  StatusBar
} from 'react-native'
import { NavigationActions } from 'react-navigation'

/**
 * @class
 * @classdesc 返回状态管理
 */
class AppNavigationControl extends Component {
  /**
   * 添加返回事件监听
   */
  componentWillMount () {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => this.onBackAndroid())
    }
  }

  componentDidMount () {
    // app状态监听
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  /**
   *  卸载组件监听
   */
  componentWillUnmount () {
    if (Platform.OS === 'android') {
      // 卸载返回按钮监听
      BackHandler.removeEventListener('hardwareBackPress', () => this.onBackAndroid())
    }
    // 卸载状态监听
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  /**
   * 添加app状态监听
   * @param {string} nextAppState app状态
   */
  _handleAppStateChange (nextAppState) {
    console.log('nextAppState', nextAppState)
    // app为活跃状态
    if (nextAppState === 'active') {
      Platform.OS === 'android' && StatusBar.setTranslucent(true)
    } else {}
  }

  /**
   * android返回键监听
   */
  async onBackAndroid () {
    const nav = this.props.nav
    const { index, routes } = nav
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 两秒内连续点击两次退出app
      this.props.dispatch({ type: 'ExitApp' })
      return false
    } else if (index === 0) {
      // 在引导界面直接退出app
      return BackHandler.exitApp()
    } else if (index === 1 && routes[1].index === 0 && routes[1].routes[0].index === 0 && routes[1].routes[0].routes[0].index === 0 && !routes[1].routes[0].isDrawerOpen) {
      // 在主界面监听返回事件
      this.lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      return false
    } else {
      // 普通界面，返回到上一个界面
      this.props.dispatch(NavigationActions.back())
      return true
    }
  }
  render () {
    return (
      <AppWithNavigationState />
    )
  }
}

const mapStateToProps = (state, dispatch) => ({
  nav: state.nav,
  dispatch
})

export default connect(mapStateToProps)(AppNavigationControl)
