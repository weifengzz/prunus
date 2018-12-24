/**
 * 开屏广告
 * 2018-12-21 14:14
 * @author koohead
 * @description 开屏广告
 */

import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native'
import { SplashScreen, TouchableOpacity } from '../../../components'
import { OPEN_SCREEN_AD_SCREEN, LAST_INACTIVE_TIME } from '../../../data'
import { storage } from '../../../utils'
import { OPEN_SCREEN_REAMINI_TIME } from '../../../config/config'

const DATA = {
  title: '开屏广告',
  content: '开屏广告内容',
  url: 'http://5b0988e595225.cdn.sohucs.com/images/20180714/db72b4280ca242c6964b07f301858094.jpeg'
}

/**
 * @class
 * @classdesc 开屏广告
 */
class OpenScreenAdScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      remainingTime: OPEN_SCREEN_REAMINI_TIME
    }
  }

  async componentDidMount () {
    const data = await storage.getItem(OPEN_SCREEN_AD_SCREEN)
    if (data) {
      this.setState({
        data
      })
      SplashScreen.hide()
      // 开启计时器
      this.openRemainingTimer()
    } else {
      this.props.navigation.navigate('main')
    }
    // 存储广告信息
    storage.setItem(OPEN_SCREEN_AD_SCREEN, DATA)
  }

  componentWillUnmount () {
    this.interval && clearInterval(this.interval)
  }

  /**
   * 开启计时器
   */
  openRemainingTimer () {
    this.interval = setInterval(async () => {
      if (this.state.remainingTime > 0) {
        this.setState({
          remainingTime: this.state.remainingTime - 1
        })
      } else {
        await storage.removeItem(LAST_INACTIVE_TIME)
        this.props.navigation.navigate('main')
      }
    }, 1000)
  }

  /**
   * 倒计时按钮界面
   */
  _renderTimeView () {
    return (
      <TouchableOpacity
        onPress={async () => {
          await storage.removeItem(LAST_INACTIVE_TIME)
          this.props.navigation.navigate('main')
        }}
        style={styles.jumpView}>
        <Text style={styles.btnText}>{`跳过广告 ${this.state.remainingTime}s`}</Text>
      </TouchableOpacity>
    )
  }

  /**
   * 内容界面
   */
  _renderPContent () {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('main')
        }}
        style={{ flex: 1 }} />
    )
  }

  /**
   * 渲染内容
   */
  _renderContent () {
    return (
      <View style={styles.contentView}>
        <Image source={{ uri: this.state.data.url }} style={styles.image} />
        <View style={styles.contentPView}>
          <SafeAreaView style={{ flex: 1 }}>
            {
              this._renderTimeView()
            }
            {
              this._renderPContent()
            }
          </SafeAreaView>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        { this.state.data ? this._renderContent() : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch'
  },
  contentView: {
    flex: 1
  },
  jumpView: {
    position: 'absolute',
    right: 10,
    top: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 8
  },
  contentPView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  },
  btnText: {
    fontSize: 16,
    color: 'white'
  }
})

export default OpenScreenAdScreen
