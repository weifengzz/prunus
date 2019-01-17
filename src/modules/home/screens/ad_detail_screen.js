/**
 * 广告详情界面
 * 2018-12-24 11:48
 * @author koohead
 * @description 广告详情界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  WebView,
  NetInfo
} from 'react-native'
import {
  TouchableOpacity,
  Icon,
  WebViewError
} from '../../../components'
import setStackOptions from '../../../config/stackNavigatorOptions'
import commonStyles from '../../../styles'
import { px } from '../../../utils'

/**
 * @class
 * @classdesc 开屏广告详情界面
 */
class AdDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    const { webUrl } = this.props.navigation.state.params
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
            uri: webUrl || ''
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

AdDetailScreen.navigationOptions = props => {
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
          navigation.goBack(null)
        }}>
        <View style={{ paddingHorizontal: 15, height: commonStyles.headerHeight.height, justifyContent: 'center' }}>
          <Icon size={26} color={commonStyles.textDarkColor.color} name={'close'} type={'evil_icon'} />
        </View>
      </TouchableOpacity>
    )
  })
}

export default AdDetailScreen
