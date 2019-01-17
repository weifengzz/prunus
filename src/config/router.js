/**
 * app路由管理器
 * 2018-12-11 10:03
 * @author koohead
 * @description app导航管理
 */
import React from 'react'

import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {
  Dimensions
} from 'react-native'

// import commonStyles from '../styles'
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

/**
 * 在react-navigation 3.x之后，需要手动添加 “createAppContainer”
 */
import { createAppContainer } from '@react-navigation/native'

// 引导页
import { GuideScreen } from '../modules/guide/screens'

// 主页面
import { HomeScreen, CardDetailScreen, AdDetail } from '../modules/home/screens'

// 登录注册相关界面
import { SigninScreen, ProfileScreen, ForgetPasswordScreen, TermsOfServiceScreen, PrivacyPolicyScreen } from '../modules/profile/screens'

// 自定义抽屉
import { DrawerContent } from '../modules/drawer'

// 收藏界面
import { CollectionScreen } from '../modules/collection/screens'

// 开屏广告界面
import { OpenScreenAdScreen, OpenScreenDetailScreen } from '../modules/open_screen_ads/screens'

const { width } = Dimensions.get('window')

/**
 * 主界面
 */
const mainNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
    path: '/drawer/main/home'
  },
  card_detail: {
    screen: CardDetailScreen,
    path: '/drawer/main/card_detail',
    navigationOptions: () => ({
      gesturesEnabled: true, // 设置手势返回
      gestureResponseDistance: {
        horizontal: width
      }
    })
  },
  ad_detail: {
    screen: AdDetail,
    path: '/drawer/main/ad_detail',
    navigationOptions: () => ({
      gesturesEnabled: true, // 设置手势返回
      gestureResponseDistance: {
        horizontal: width
      }
    })
  },
  collection: {
    screen: CollectionScreen,
    path: '/drawer/main/collection',
    navigationOptions: () => ({
      gesturesEnabled: true, // 设置手势返回
      gestureResponseDistance: {
        horizontal: width
      }
    })
  },
  profile: {
    screen: ProfileScreen,
    path: '/drawer/profile',
    navigationOptions: () => ({
      gesturesEnabled: true, // 设置手势返回
      gestureResponseDistance: {
        horizontal: width
      }
    })
  }
},
{
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forFade,
    transitionSpec: {
      duration: 300
    }
  }),
  headerMode: 'screen'
})

/**
 * 抽屉功能
 */
const drawerNavigator = createDrawerNavigator({
  main: {
    screen: mainNavigator,
    path: '/drawer/main'
  }
}, {
  initialRouteName: 'main',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  drawerType: 'slide',
  contentComponent: ({ navigation }) => <DrawerContent navigation={navigation} />
})

/**
 * 登录相关界面
 */

const widthSigninNavigator = createStackNavigator({
  signin: {
    screen: SigninScreen,
    path: '/width_signin/signin'
  },
  forget_password: {
    screen: ForgetPasswordScreen,
    path: '/width_signin/forget_password'
  },
  terms_of_service: {
    screen: TermsOfServiceScreen,
    path: '/width_signin/terms_of_service'
  },
  privacy_policy: {
    screen: PrivacyPolicyScreen,
    path: '/width_signin/privacy_policy'
  }
},
{
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    transitionSpec: {
      duration: 300
    }
  }),
  headerMode: 'screen'
})

/**
 * 根界面
 */
const rootNavigator = createStackNavigator({
  drawer: {
    screen: drawerNavigator,
    path: '/drawer',
    navigationOptions: {
      header: null
    }
  },
  width_signin: {
    screen: widthSigninNavigator,
    path: '/width_signin',
    navigationOptions: {
      header: null
    }
  }
},
{
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forVertical,
    transitionSpec: {
      duration: 300
    }
  }),
  headerMode: 'screen'
})

/**
 * 引导页
 */
const guideNavigator = createStackNavigator({
  welcome: {
    screen: GuideScreen,
    path: '/guide',
    navigationOptions: {
      header: null
    }
  }
})

/**
 * 开屏幕广告
 */
const openScreenNavigator = createStackNavigator({
  open_screen_ad: {
    screen: OpenScreenAdScreen,
    path: '/open_screen_ad',
    navigationOptions: {
      header: null
    }
  },
  open_screen_detail: {
    screen: OpenScreenDetailScreen,
    path: '/open_screen_ad/open_screen_detail'
  }
},
{
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    transitionSpec: {
      duration: 400
    }
  }),
  headerMode: 'screen'
})

/**
 * 路由配置
 */
const Router = createSwitchNavigator({
  guide: guideNavigator,
  root: rootNavigator,
  open_screen: openScreenNavigator
}, {
  initialRouteName: 'guide'
})

export default createAppContainer(Router)
