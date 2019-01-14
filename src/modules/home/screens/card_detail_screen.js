/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Platform
} from 'react-native'
import {
  cancelFullScreen
} from '../../../components'

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 卡片详情
 */
class CardDetailScreen extends Component {
  componentWillUnmount () {
    if (!IS_IOS) {
      cancelFullScreen()
    }
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
