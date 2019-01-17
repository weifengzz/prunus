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
  NewVersionModal,
  adImageCache,
  deleteAdImageCache
  // downloadAndInstallApp
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
    url: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180131/8a669b1775ba44edbaa8641465edca29.gif'
  },
  {
    title: '开屏广告',
    content: '开屏广告内容',
    url: 'http://d.ifengimg.com/w128/p0.ifengimg.com/pmop/2017/0707/A01A745C519DF02950347113AD22939E74C97590_size1521_w730_h1123.gif'
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
        // 展示版本信息
        let versionMsg = {}
        versionMsg.updateTime = '2012-12-02'
        versionMsg.version = '1.0.1'
        versionMsg.address = 'http://app.huamao001.cn/huamao_1.1.9.apk'
        versionMsg.updateMsg = '更新信息'
        versionMsg.updateState = 0
        versionMsg.appName = '花猫'
        versionMsg.appAddress = 'http://app.huamao001.cn/huamao_1.1.9.apk'
        if (!IS_IOS) {
          // this._newVersionModal._showModal(versionMsg)
        } else {
          // openMarket({
          //   androidAddress: '',
          //   iOSAddress: 'wei-xin/id414478124'
          // })
        }
      }, 4000)
    }, 50)
    this.operationOpenAddScreen()
  }

  // 操作广告信息
  async operationOpenAddScreen () {
    // 获取最新的文件数据
    const imageData = Object.assign({}, DATA[randomNumber(0, 1)])
    const lastCacheData = await storage.getItem(OPEN_SCREEN_AD_SCREEN)
    // 有上次缓存数据
    if (lastCacheData) {
      deleteAdImageCache({
        filePath: lastCacheData.filePath || '',
        onSuccess: () => {
          adImageCache(
            {
              imgUrl: imageData.url,
              imgName: '',
              onSuccess: (filePath) => {
                imageData.filePath = filePath
                storage.setItem(OPEN_SCREEN_AD_SCREEN, imageData)
              },
              onError: () => {}
            }
          )
        },
        onError: () => {
          adImageCache(
            {
              imgUrl: imageData.url,
              imgName: '',
              onSuccess: (filePath) => {
                imageData.filePath = filePath
                storage.setItem(OPEN_SCREEN_AD_SCREEN, imageData)
              },
              onError: () => {}
            }
          )
        }
      })
    } else {
      adImageCache(
        {
          imgUrl: imageData.url,
          imgName: '',
          onSuccess: (filePath) => {
            imageData.filePath = filePath
            storage.setItem(OPEN_SCREEN_AD_SCREEN, imageData)
          },
          onError: () => {}
        }
      )
    }
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'flex-end' }}>
              <LottieView
                autoPlay
                loop
                resizeMode={'cover'}
                style={{ width: '70%' }}
                source={require('../../../assets/lotties/happy_new_year_.json')}
              />
            </View>
            <View style={{ flex: 3, alignItems: 'center' }}>
              <LottieView
                autoPlay
                loop
                resizeMode={'cover'}
                style={{ width: '40%' }}
                source={require('../../../assets/lotties/material_wave_loading.json')}
              />
            </View>
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
        <NewVersionModal
          ref={(nvm) => { this._newVersionModal = nvm }}
          onPress={(hide) => {
          }}
          onClose={async () => {
          }}
        />
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
    title: 'Prunus',
    headerLeftComponent: () => <HeaderLeft navigation={navigation} />,
    headerRightComponent: () => <HeaderRight navigation={navigation} />
  })
}

export default HomeScreen
