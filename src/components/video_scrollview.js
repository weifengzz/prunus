/**
 * 视频播放滑动组件
 * 2019-01-18 11:03
 * @author koohead
 * @description 视频播放滑动组件
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'

const { width: G_WIDTH } = Dimensions.get('window')

/**
 * @class 视频播放滑动组件
 * @classdesc 视频播放滑动组件
 */
class VideoScrollView extends Component {
  render () {
    const { datas } = this.props
    return (
      <ScrollView
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: `${100 * datas.length}%`, width: G_WIDTH }}
      >
        {
          datas.map((item, index) => {
            return (
              <View key={index} style={styles.container} />
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})

export default VideoScrollView
