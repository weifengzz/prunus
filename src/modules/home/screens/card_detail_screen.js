/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import FullScreenAndroid from '../../../components/full_screen'

/**
 * @class
 * @classdesc 卡片详情
 */
class CardDetailScreen extends Component {
  componentWillUnmount () {
    FullScreenAndroid.cancelFullScreen()
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>hello</Text>
      </View>
    )
  }
}

export default CardDetailScreen
