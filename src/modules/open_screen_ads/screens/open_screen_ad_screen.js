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
  Text
} from 'react-native'
import { SplashScreen, TouchableOpacity } from '../../../components'

import { OPEN_SCREEN_AD_SCREEN, LAST_INACTIVE_TIME } from '../../../data'
import { storage } from '../../../utils'

const DATA = {
  title: '开屏广告',
  content: '开屏广告内容',
  url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545384100652&di=79031c266b8fe50f777130131294aa36&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F23%2F1533137345-ZudoEYvqTB.jpeg'
}

/**
 * @class
 * @classdesc 开屏广告
 */
class OpenScreenAdScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }
  async componentDidMount () {
    const data = await storage.getItem(OPEN_SCREEN_AD_SCREEN)
    if (data) {
      this.setState({
        data
      })
      SplashScreen.hide()
    } else {
      this.props.navigation.navigate('main')
    }
    storage.setItem(OPEN_SCREEN_AD_SCREEN, DATA)
  }

  /**
   * 渲染内容
   */
  _renderContent () {
    return (
      <View style={styles.contentView}>
        <Image source={{ uri: this.state.data.url }} style={styles.image} />
        <TouchableOpacity
          onPress={async () => {
            await storage.removeItem(LAST_INACTIVE_TIME)
            this.props.navigation.navigate('main')
          }}
          style={styles.jumpView}>
          <Text>跳过</Text>
        </TouchableOpacity>
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
    right: 20,
    top: 40,
    width: 60,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default OpenScreenAdScreen
