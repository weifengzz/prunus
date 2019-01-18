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
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 0
    }
    this.vHeight = 0
  }
  // 动画结束后告诉组件当前是哪一张界面
  onAnimationEnd (scrollView) {
    const { onScrollEnd } = this.props
    if (this.vHeight !== 0) {
      // 计算一页滑动的偏移量
      let offSetY = scrollView.nativeEvent.contentOffset.y
      // 算出当前为第几页
      let currentPage = Math.round((offSetY / this.vHeight))
      if (this.state.currentPage !== currentPage) {
        this.setState({
          currentPage
        })
        onScrollEnd(currentPage)
      }
    }
  }

  _renderItem (item, index) {
    const { childrenComponent } = this.props
    return (
      <View
        isCurrentView={() => index !== this.state.currentPage}
        style={styles.itemView}>
        { childrenComponent(item, index, index === this.state.currentPage) }
      </View>
    )
  }

  render () {
    const { datas } = this.props
    if (datas.length === 0) {
      return <View />
    }
    return (
      <ScrollView
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: `${100 * datas.length}%`, width: G_WIDTH }}
        onMomentumScrollEnd={(scrollView) => this.onAnimationEnd(scrollView)}
      >
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout
            this.vHeight = height / datas.length
          }}
          style={{ flex: 1 }}>
          {
            datas.map((item, index) => {
              return (
                <View
                  key={index} style={styles.container}
                >
                  { this._renderItem(item, index) }
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

VideoScrollView.defaultProps = {
  onScrollEnd: () => {},
  childrenComponent: () => {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  itemView: {
    flex: 1
  }
})

export default VideoScrollView
