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
  Dimensions
} from 'react-native'
import {
  SplashScreen,
  LottieView,
  downloadAndInstallApp
  // PulseLoader
} from '../../../components'
import {
  HeaderLeft,
  HeaderRight,
  HomeSwipe
} from '../component'
import setStackOptions from '../../../config/stackNavigatorOptions'
// import commonStyles from '../../../styles'
import { storage, randomNumber } from '../../../utils'
import { OPEN_SCREEN_AD_SCREEN } from '../../../data'

// 判断为iOS设备
const IS_IOS = Platform.OS === 'ios'
// 当前屏幕高度
const { width: C_WIDTH } = Dimensions.get('window')
// footer高度比例
const CARD_HEIGHT_RATIO = 0.2
// footer高度
const FOOTER_HEIGHT = C_WIDTH / 3.5

const DATA = [
  {
    title: '开屏广告',
    content: '开屏广告内容',
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545645009567&di=0ca0c1a2901e968a74a286e8ae980bda&imgtype=0&src=http%3A%2F%2Fwww.desktx.com%2Fd%2Ffile%2Fphone%2Fmeinv%2F20180420%2F782b5f69008fb9d3a3946451121379bc.jpg'
  },
  {
    title: '开屏广告',
    content: '开屏广告内容',
    url: 'http://pic1.win4000.com/mobile/2017-11-20/5a1283e93a10d.jpg'
  }
]

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
      cardHeight: 0
    }
  }

  async componentDidMount () {
    // 添加定时器，防止动画加载页面跳转卡顿
    this.timer = setTimeout(() => {
      this.openMenu()
      SplashScreen.hide()
      this.timer1 = setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 2000)
    }, 50)
    this.operationOpenAddScreen()
    downloadAndInstallApp({
      useDownloadManager: true,
      notification: true,
      title: '下载',
      description: '下载app',
      appName: 'huamao',
      downLoadUrl: 'http://app.huamao001.cn/huamao_1.1.9.apk',
      onError: () => {},
      onProgress: (received, total) => {},
      onSuccess: () => {}
    })
  }

  // 操作广告信息
  operationOpenAddScreen () {
    storage.setItem(OPEN_SCREEN_AD_SCREEN, DATA[randomNumber(0, 1)])
  }

  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
    this.timer1 && clearTimeout(this.timer1)
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
   * AndroidMainfest.xml 使用 windowSoftInputMode=“stateVisible”
   * 可能会出现问题
   * 在android中键盘遮挡问题会使android的整体布局向上推
   * 这样会导致本界面整体布局上推，从而使布局错乱
   * 判断android布局与屏幕高度相差太多（值现在设为30高度），则不再响应重定义布局
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
        // <PulseLoader
        //   borderColor={commonStyles.primaryColor.color}
        //   avatar={require('../../../assets/icons/author.png')}
        // />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: '40%', width: '40%' }}>
            <LottieView
              autoPlay
              resizeMode={'cover'}
              style={{ flex: 1 }}
              source={require('../../../assets/lotties/furtune.json')}
            />
          </View>
        </View>
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
