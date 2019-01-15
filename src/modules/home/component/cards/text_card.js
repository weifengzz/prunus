/**
 * 文字卡片组件
 * 2018-12-14 14:13
 * @author koohead
 * @description 文字卡片组件
 */

import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Platform
} from 'react-native'
import {
  TouchableOpacity,
  fullScreen
} from '../../../../components'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 滑动卡片
 */
class TextCard extends Component {
  _renderContent () {
    return this._renderText()
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
    const { cardHeight, stackOffsetY, stackDepth, navigation } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!IS_IOS) {
            fullScreen()
          }
          navigation.navigate('card_detail')
        }}>
        <View style={[styles.card, { backgroundColor: this.props.backgroundColor, height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }, IS_IOS ? styles.shadowStyle : { borderWidth: 1, borderColor: '#bdbdbd' }]}>
          {
            this._renderContent()
          }
        </View>
      </TouchableOpacity>
    )
  }
}

TextCard.defaultProps = {
  cardHeight: 0,
  stackOffsetY: 15,
  stackDepth: 3
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 10
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.7,
    shadowRadius: 10
  }
})

export default withNavigation(TextCard)
