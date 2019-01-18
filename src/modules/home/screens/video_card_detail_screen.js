/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Platform,
  StyleSheet
} from 'react-native'
import {
  cancelFullScreen,
  VideoScrollView
} from '../../../components'

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 卡片详情
 */
class VideoCardDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = []
  }

  componentWillUnmount () {
    if (!IS_IOS) {
      cancelFullScreen()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <VideoScrollView
          datas={this.state.datas}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default VideoCardDetailScreen
