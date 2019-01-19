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
  // fullScreen,
  LinearGradient,
  Icon,
  CoverImage,
  SpliteLine
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
    const { cardData } = this.props
    return (
      <View style={IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid}>
        <Image source={{ uri: cardData.img }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
      </View>
    )
  }

  /**
   * 描述界面
   */
  _renderDescView () {
    const { cardData } = this.props
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']}
        style={styles.descView}
      >
        <View style={styles.headerView}>
          <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
          <View style={styles.headerContentView}>
            <Text style={styles.headerNameText}>我叫白小飞</Text>
            <Text style={styles.descText}>笑死你Y的</Text>
          </View>
          <View style={{ width: 30 }}>
            <Icon size={20} color={'white'} name={'sharealt'} type={'ant_design'} />
          </View>
        </View>
        <View style={styles.centerView}>
          <Text numberOfLines={5} style={styles.centerText}>{cardData.text}</Text>
        </View>
        <View>
          <SpliteLine color={'white'} />
          <View style={styles.footerView}>
            <View style={[styles.footerItemView, { flex: 2 }]}>
              <View style={styles.itemLeftView}>
                <Icon size={18} color={'white'} name={'smileo'} type={'ant_design'} />
                <Text style={styles.commonSmallText}>100</Text>
                <View style={{ width: 20 }} />
                <Icon size={20} color={'white'} name={'eyeo'} type={'ant_design'} />
                <Text style={styles.commonSmallText}>3.5k</Text>
              </View>
              <Icon size={18} color={'red'} name={'heart'} type={'ant_design'} />
              <Text style={styles.commonSmallText}>2.2k</Text>
              <View style={{ width: 20 }} />
              <Icon size={18} color={'white'} name={'message1'} type={'ant_design'} />
              <Text style={styles.commonSmallText}>80</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    )
  }

  render () {
    const { cardHeight, stackOffsetY, stackDepth, cardData } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // if (!IS_IOS) {
          //   fullScreen()
          // }
          // navigation.navigate('card_detail')
        }}>
        <View style={[styles.card, { backgroundColor: cardData.backgroundColor, height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }, IS_IOS ? styles.shadowStyle : {}]}>
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
    height: 70,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 20
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
  descText: {
    fontSize: 12,
    marginTop: 5,
    color: 'white'
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CARD_WIDTH / 6
  },
  centerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 30
  },
  footerView: {
    height: 70,
    width: CARD_WIDTH,
    flexDirection: 'row'
  },
  footerItemView: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  commonSmallText: {
    fontSize: 12,
    color: '#ccd3dd',
    marginLeft: 10,
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default withNavigation(ImageCard)
