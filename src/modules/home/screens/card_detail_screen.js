/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Platform
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
class CardDetailScreen extends Component {
  componentWillUnmount () {
    if (!IS_IOS) {
      cancelFullScreen()
    }
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
        <VideoScrollView
          datas={[
            {
              backgroundColor: 'blue'
            },
            {
              backgroundColor: 'yellow'
            },
            {
              backgroundColor: 'green'
            },
            {
              backgroundColor: 'yellow'
            },
            {
              backgroundColor: 'blue'
            },
            {
              backgroundColor: 'green'
            },
            {
              backgroundColor: 'red'
            }
          ]}
        />
      </View>
    )
  }
}

export default CardDetailScreen
