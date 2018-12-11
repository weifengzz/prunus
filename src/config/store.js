/**
 * store 状态管理
 * 2018-12-11 11:28
 * @author koohead
 * @description redux store
 */

import {
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import Router from './router'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { NavigationActions } from 'react-navigation'
import {
  BackHandler
} from 'react-native'

import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'

// 初始化router状态
const initialState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('guide'))

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
persistStore(store)

export default store
