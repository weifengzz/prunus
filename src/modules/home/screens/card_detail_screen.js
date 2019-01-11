/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View
} from 'react-native'
import FullScreenAndroid from '../../../components/full_screen.android'

/**
 * @class
 * @classdesc 卡片详情
 */
class CardDetailScreen extends Component {
  componentDidMount () {
    setTimeout(() => {
      FullScreenAndroid.fullScreen()
    }, 500)
  }
  componentWillUnmount () {
    FullScreenAndroid.cancelFullScreen()
  }
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: 'green' }} />
    )
  }
}

export default CardDetailScreen
