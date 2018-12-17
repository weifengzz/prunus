/**
 * 卡片组件
 * 2018-12-14 14:13
 * @author koohead
 * @description home底部按钮界面
 */

import React, { Component } from 'react'
import {
  Alert,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image
} from 'react-native'
import {
  TouchableOpacity
} from '../../../../components'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94
const CARD_HEIGHT = height * 0.6

/**
 * @class
 * @classdesc 滑动卡片
 */
class Card extends Component {
  _renderContent () {
    const { type } = this.props
    if (type === 1) {
      return this._renderText()
    } else {
      return this._renderImage()
    }
  }
  _renderImage () {
    const { img } = this.props
    return (
      <View style={{ width: '100%', height: '80%' }}>
        <Image source={{ uri: img }} style={{ width: '100%', height: '80%', resizeMode: 'stretch', borderRadius: 10 }} />
      </View>
    )
  }
  _renderText () {
    const { text } = this.props
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, color: 'white' }}>{text}</Text>
      </View>
    )
  }
  render () {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Alert.alert('点击了小卡片')
        }}>
        <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
          {
            this._renderContent()
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10
  }
})

export default Card
