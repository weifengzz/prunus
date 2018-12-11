/**
 * store 状态管理
 * 2018-12-11 11:28
 * @author koohead
 * @description redux store
 */

import {
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { NavigationActions } from 'react-navigation'
import storage from 'redux-persist/lib/storage'
import {
  BackHandler,
  AsyncStorage
} from 'react-native'
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import Router from './router'

/**
 * 初始化router状态
 */
const initialState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('guide'))

/**
 * react-navigation reducer
 * @param {any} state 状态
 * @param {any} action action
 */
const navReducer = (state = initialState, action) => {
  let nextState = Router.router.getStateForAction(action, state)
  switch (action.type) {
    case 'ExitApp':
      nextState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('main'))
      BackHandler.exitApp()
      break
    case 'Navigation/NAVIGATE':
      if (action.routeName === 'signin' && action.params && action.params.reset) {
        nextState = Router.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'signin' }),
          initialState
        )
      }
      break
  }
  return nextState || state
}

/**
 * 中间件
 */
const middleware = createReactNavigationReduxMiddleware(
  'guide',
  (state) => state.nav
)

const appReducer = combineReducers({
  nav: navReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  {},
  compose(
    applyMiddleware(middleware),
    applyMiddleware(thunk)
  )
)

/**
 * 将持久化存储放入whitelist白名单之中
 */
persistStore(store, { storage: AsyncStorage, whitelist: [] })

export default store
