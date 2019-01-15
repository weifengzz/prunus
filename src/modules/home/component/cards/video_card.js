/**
 * 视频卡片组件
 * 2018-01-15 10:21
 * @author koohead
 * @description 视频卡片组件
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
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
class VideoCard extends Component {
  _renderContent () {
    return this._renderImage()
  }
  _renderImage () {
    const { img } = this.props
    return (
      <View style={IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid}>
        <Image source={{ uri: img }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
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
        <View style={[styles.card, { backgroundColor: this.props.backgroundColor, height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }, IS_IOS ? styles.shadowStyle : {}]}>
          {
            this._renderContent()
          }
        </View>
      </TouchableOpacity>
    )
  }
}

VideoCard.defaultProps = {
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
      width: 3,
      height: 3
    },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
  imageViewAndroid: {
    width: '100%',
    height: '100%'
  },
  imageViewIOS: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10
  },
  imageAndroid: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overlayColor: 'white',
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#bdbdbd'
  },
  imageIOS: {
    width: '100%',
    height: '100%',
    overlayColor: 'white',
    resizeMode: 'cover',
    borderRadius: 10
  }
})

export default withNavigation(VideoCard)
