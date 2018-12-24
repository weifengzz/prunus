/**
 * 开屏广告详情界面
 * 2018-12-24 11:48
 * @author koohead
 * @description 开屏广告详情界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  WebView,
  NetInfo,
  Platform,
  BackHandler
} from 'react-native'
import {
  TouchableOpacity,
  Icon,
  WebViewError
} from '../../../components'
import setStackOptions from '../../../config/stackNavigatorOptions'
import commonStyles from '../../../styles'
import { px } from '../../../utils'

const IS_ANDROID = Platform.OS === 'android'

/**
 * @class
 * @classdesc 开屏广告详情界面
 */
class OpenScreenDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onBackButtonPressAndroid = this._onBackButtonPressAndroid.bind(this)
  }

  componentDidMount () {
    // 返回按钮事件监听
    if (IS_ANDROID) {
      BackHandler.addEventListener('onAdDetailBackPress', this.onBackButtonPressAndroid)
    }
  }

  componentWillUnmount () {
    if (IS_ANDROID) {
      BackHandler.removeEventListener('onAdDetailBackPress',
        this.onBackButtonPressAndroid)
    }
  }

  /**
   * android 返回按钮监听事件
   */
  async _onBackButtonPressAndroid () {
    this.props.navigation.navigate('main')
  }

  render () {
    return (
      <View style={styles.container}>
        <WebView
          ref={(wv) => { this.webView = wv }}
          javaScriptEnabled
          mixedContentMode='always'
          scalesPageToFit={false}
          domStorageEnabled={false}
          renderError={() => <WebViewError
            useRefresh
            onPress={() => {
              NetInfo.isConnected.fetch().done((isConnected) => {
                if (!isConnected) {
                } else {
                  // 重新加载网页
                  this.webView.reload()
                }
              })
            }} />}
          bounces={false}
          source={{
            uri: 'https://www.baidu.com/'
          }}
        />
        <StatusBar hidden={false} barStyle={'dark-content'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

OpenScreenDetailScreen.navigationOptions = props => {
  const { navigation } = props
  return setStackOptions({
    navigation: navigation,
    title: '',
    autoHeaderLeft: false,
    autoHeaderRight: true,
    backgroundColor: 'white',
    titleColor: commonStyles.textDarkColor.color,
    headerLeftColor: commonStyles.textDarkColor.color,
    borderBottomWidth: px(2),
    headerLeftComponent: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('main')
        }}>
        <View style={{ paddingHorizontal: 15, height: commonStyles.headerHeight.height, justifyContent: 'center' }}>
          <Icon size={26} color={commonStyles.textDarkColor.color} name={'close'} type={'evil_icon'} />
        </View>
      </TouchableOpacity>
    )
  })
}

export default OpenScreenDetailScreen
