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
  StatusBar,
  AppState
} from 'react-native'
import { NavigationActions } from 'react-navigation'

/**
 * @class
 * @classdesc 返回状态管理
 */
class AppNavigationControl extends Component {
  // 添加返回事件监听
  componentWillMount () {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => this.onBackAndroid())
    }
  }

  componentDidMount () {
    // app状态监听
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  // 卸载组件监听
  componentWillUnmount () {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => this.onBackAndroid())
    }
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange (nextAppState) {
    if (nextAppState === 'active') {
      Platform.OS === 'android' && StatusBar.setTranslucent(true)
    }
  }
  async onBackAndroid () {
    const nav = this.props.nav
    const { index, routes } = nav
    console.log('index, routes', index, routes)
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      this.props.dispatch({ type: 'ExitApp' })
      return false
    } else if (index === 0) {
      return BackHandler.exitApp()
    } else if ((index === 1 && routes[1].index === 0)) {
      this.lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      return false
    } else {
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
