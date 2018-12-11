/**
 * react-navigation 状态管理
 * 2018-12-11 11:27
 * @author koohead
 * @description 路由状态管理器
 */
import Router from './router'
import { connect } from 'react-redux'
import {
  reduxifyNavigator
} from 'react-navigation-redux-helpers'

const App = reduxifyNavigator(Router, 'guide')

const mapStateToProps = (state, dispatch) => ({
  state: state.nav,
  dispatch
})

/**
 * app路由状态
 */
const AppWithNavigationState = connect(mapStateToProps)(App)

export default AppWithNavigationState
