/**
 * 图片卡片组件
 * 2018-12-14 14:13
 * @author koohead
 * @description 图片卡片组件
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Platform,
  Text
} from 'react-native'
import {
  TouchableOpacity,
  fullScreen,
  LinearGradient,
  Icon,
  CoverImage
} from '../../../../components'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 滑动卡片
 */
class ImageCard extends Component {
  _renderContent () {
    return (
      <View style={styles.contentView}>
        {this._renderImage()}
        {this._renderDescView()}
      </View>
    )
  }
  /**
   * 渲染图片
   */
  _renderImage () {
    const { img } = this.props
    return (
      <View style={IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid}>
        <Image source={{ uri: img }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
      </View>
    )
  }

  /**
   * 描述界面
   */
  _renderDescView () {
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']}
        style={styles.descView}
      >
        <View style={styles.headerView}>
          <Icon size={20} color={'white'} name={'sharealt'} type={'ant_design'} />
        </View>
        <View style={styles.centerView}>
          <Text style={styles.centerText}>城市的夜晚, 繁华中隐藏着一种孤独#</Text>
        </View>
        <View style={styles.footerView}>
          <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
          <View style={styles.headerContentView}>
            <Text style={styles.headerNameText}>我叫白小飞</Text>
            <Text numberOfLines={1} style={styles.timeText}>1天前</Text>
          </View>
        </View>
      </LinearGradient>
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

ImageCard.defaultProps = {
  cardHeight: 0,
  stackOffsetY: 15,
  stackDepth: 3
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 10
  },
  contentView: {
    height: '100%',
    width: '100%'
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.7,
    shadowRadius: 10
  },
  imageViewAndroid: {
    width: '100%',
    height: '100%',
    borderRadius: 10
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
  },
  descView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    borderRadius: 10
  },
  headerView: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CARD_WIDTH / 5
  },
  centerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 30
  },
  footerView: {
    height: 80,
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  headerContentView: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1
  },
  headerNameText: {
    fontSize: 16,
    color: 'white'
  },
  timeText: {
    fontSize: 12,
    marginTop: 5,
    color: 'white'
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
})

export default withNavigation(ImageCard)
