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
  fullScreen,
  Icon,
  SpliteLine,
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
class TextCard extends Component {
  _renderContent () {
    return (
      <View style={styles.contentView}>
        {this._renderHeaderView()}
        {this._renderText()}
        {this._renderFooterView()}
      </View>
    )
  }

  /**
   * 渲染
   */
  _renderHeaderView () {
    return (
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
    )
  }

  /**
   * 文字
   */
  _renderText () {
    const { cardData } = this.props
    return (
      <View style={{ flex: 1, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text numberOfLines={10} style={{ fontSize: 18, color: 'white', lineHeight: 30 }}>{cardData.text}</Text>
      </View>
    )
  }

  _renderFooterView () {
    return (
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
    )
  }

  render () {
    const { cardHeight, stackOffsetY, stackDepth, navigation, cardData } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!IS_IOS) {
            fullScreen()
          }
          navigation.navigate('card_detail', { data: cardData })
        }}>
        <View style={[styles.card, { backgroundColor: cardData.backgroundColor, height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }, IS_IOS ? styles.shadowStyle : { borderWidth: 1, borderColor: '#bdbdbd' }]}>
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

export default withNavigation(TextCard)
