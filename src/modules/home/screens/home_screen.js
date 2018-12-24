/**
 * 引导界面
 * 2018-12-11 09:51
 * @author koohead
 * @description 主页面
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  AppState
} from 'react-native'
import {
  SplashScreen,
  PulseLoader
} from '../../../components'
import {
  HeaderLeft,
  HeaderRight,
  HomeSwipe
} from '../component'
import setStackOptions from '../../../config/stackNavigatorOptions'
import commonStyles from '../../../styles'
import moment from 'moment'
import { storage } from '../../../utils'
import { LAST_INACTIVE_TIME } from '../../../data'
import { OPEN_SCREEN_TIME_DIFF } from '../../../config/config'

// 判断为iOS设备
const IS_IOS = Platform.OS === 'ios'
// 当前屏幕高度
const { width: C_WIDTH } = Dimensions.get('window')
// footer高度比例
const CARD_HEIGHT_RATIO = 0.2
// footer高度
const FOOTER_HEIGHT = C_WIDTH / 3.5

/**
 * @class
 * @classdesc 主界面
 * @description 主界面
 */
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      showView: false,
      cardHeight: 0
    }
    this.handleAppStateChange = this._handleAppStateChange.bind(this)
  }

  async componentDidMount () {
    if (!await this.isActiveScreen()) {
      this.openMenu()
      // 添加屏幕活跃状态监听
      AppState.addEventListener('change', this.handleAppStateChange)
      this.timer = setTimeout(() => {
        SplashScreen.hide()
        this.timer1 = setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 3000)
      }, 50)
    }
  }

  /**
   * 判断是否开启开屏广告
   */
  async isActiveScreen () {
    // 获取上一次活跃状态时间
    let lastInactiveTime = await storage.getItem(LAST_INACTIVE_TIME)
    // 时间差
    let timeDiff = moment(moment()).diff(moment(lastInactiveTime), 'seconds')
    if (timeDiff > OPEN_SCREEN_TIME_DIFF) {
      storage.removeItem(LAST_INACTIVE_TIME)
      this.props.navigation.navigate('open_screen')
      return true
    }
    return false
  }

  /**
   * 添加屏幕活跃状态监听
   * @param {string} nextAppState app状态
   */
  _handleAppStateChange (nextAppState) {
    // app为活跃状态
    if (nextAppState === 'active') {
      this.isActiveScreen()
    } else if (nextAppState === 'background') {
      storage.setItem(LAST_INACTIVE_TIME, moment().format())
    }
  }

  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
    this.timer1 && clearTimeout(this.timer1)
    // 卸载状态监听
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  /**
   * 打开deawermenu
   */
  openMenu () {
    this.props.navigation.setParams({
      openMenu: () => {
        this.props.navigation.openDrawer()
      }
    })
  }

  /**
   * 渲染卡片界面
   */
  _renderCard () {
    if (this.state.cardHeight) {
      return (
        <HomeSwipe
          cardHeight={this.state.cardHeight}
        />
      )
    }
    return null
  }

  /**
   * 设置组件内容高度
   */
  setContentHeight (nativeEvent) {
    let height = nativeEvent.layout.height
    let footerHeight = height * CARD_HEIGHT_RATIO
    if (footerHeight < FOOTER_HEIGHT) {
      footerHeight = FOOTER_HEIGHT
    }
    // 获取卡片高度
    let cardHeight = height - footerHeight
    /**
     * iOS设备需要判断safeview高度
     */
    if (IS_IOS) {
      if (!this.state.cardHeight || this.state.cardHeight !== nativeEvent.layout.height) {
        this.setState({
          cardHeight
        })
      }
    } else {
      if (!this.state.cardHeight) {
        this.setState({
          cardHeight
        })
      }
    }
  }

  /**
   * 渲染主界面
   */
  render () {
    if (this.state.loading) {
      return (
        <PulseLoader
          borderColor={commonStyles.primaryColor.color}
          avatar={require('../../../assets/images/header.jpg')}
        />
      )
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.contentView}
            onLayout={({ nativeEvent }) => {
              this.setContentHeight(nativeEvent)
            }}
          >
            { this._renderCard() }
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaView: {
    flex: 1
  },
  contentView: {
    flex: 1
  }
})

HomeScreen.navigationOptions = props => {
  const { navigation } = props
  return setStackOptions({
    navigation: navigation,
    title: '首页',
    headerLeftComponent: () => <HeaderLeft navigation={navigation} />,
    headerRightComponent: () => <HeaderRight navigation={navigation} />
  })
}

export default HomeScreen
