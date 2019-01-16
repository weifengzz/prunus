/**
 * 短视频卡片组件
 * 2019-01-16 14:01
 * @author koohead
 * @description 短视频卡片组件
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Text
} from 'react-native'
import {
  TouchableOpacity,
  fullScreen,
  CoverImage,
  LinearGradient,
  Icon
} from '../../../../components'
import { withNavigation } from 'react-navigation'
import Video from 'react-native-video'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94
const IS_IOS = Platform.OS === 'ios'

class ShortVideoCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: true
    }
  }

  /**
   * 开始
   */
  play () {
    this.setState({
      paused: false
    })
  }

  /**
   * 暂停
   */
  paused () {
    this.setState({
      paused: true
    })
  }

  /**
   * 渲染内容界面
   */
  _renderContent () {
    return (
      <View style={styles.contentView}>
        {this._renderBackView()}
        {this._renderImage()}
        {this._renderHeaderView()}
        {this._renderVideo()}
        {this._renderRightView()}
        {this._renderFooterView()}
      </View>
    )
  }

  /**
   * 渲染背景
   */
  _renderBackView () {
    return (
      <View />
    )
  }

  /**
   * 渲染右边界面
   */
  _renderRightView () {
    return (
      <View style={styles.rightView}>
        <View style={styles.rightItemView}>
          <Icon size={20} color={'#c3dcdd'} name={'smileo'} type={'ant_design'} />
          <Text style={styles.rightItemText}>200</Text>
        </View>
        <View style={styles.rightItemView}>
          <Icon size={22} color={'#c3dcdd'} name={'eyeo'} type={'ant_design'} />
          <Text style={styles.rightItemText}>10k</Text>
        </View>
        <View style={styles.rightItemView}>
          <Icon size={20} color={'red'} name={'heart'} type={'ant_design'} />
          <Text style={styles.rightItemText}>8k</Text>
        </View>
        <View style={styles.rightItemView}>
          <Icon size={20} color={'#c3dcdd'} name={'message1'} type={'ant_design'} />
          <Text style={styles.rightItemText}>90</Text>
        </View>
      </View>
    )
  }

  /**
   * 渲染底部界面
   */
  _renderFooterView () {
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.5)']}
        style={styles.footerView}>
        <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
        <View style={styles.headerContentView}>
          <Text style={styles.headerNameText}>我叫白小飞</Text>
          <Text numberOfLines={1} style={styles.descText}>2018过去了，2019你有什么打算呢？🎉🎉🎉</Text>
        </View>
      </LinearGradient>
    )
  }

  /**
   * 渲染背景图片
   */
  _renderImage () {
    const { videoImg } = this.props
    return (
      <View style={IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid}>
        <Image blurRadius={IS_IOS ? 80 : 20} source={{ uri: videoImg }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
        <View style={[IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid, { backgroundColor: 'black', opacity: 0.7, borderRadius: 10 }]} />
      </View>
    )
  }

  /**
   * 渲染头部
   */
  _renderHeaderView () {
    return (
      <View />
    )
  }

  _renderVideo () {
    const { cardHeight, videoUrl, stackOffsetY, stackDepth } = this.props
    // 卡片高度
    const ch = cardHeight - stackOffsetY * stackDepth + stackOffsetY
    // 卡片宽度
    const cw = CARD_WIDTH
    // 视频高度
    let vh = 0
    // 视频宽度
    let vw = 0
    // 视频 9/16高度（一般视频宽高比为16:9）
    if (cw >= ch * 9 / 16) {
      vh = ch
      vw = vh * 9 / 16
    } else {
      vw = cw
      vh = vw * 16 / 9
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Video
          source={{ uri: videoUrl }}
          ref={(ref) => {
            this.player = ref
          }}
          paused={this.state.paused}
          repeat
          style={{ height: vh, width: vw }} />
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

ShortVideoCard.getDerivedStateFromProps = (nextProps) => {
  return {
    paused: nextProps.paused
  }
}

ShortVideoCard.defaultProps = {
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
  imageViewAndroid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  imageViewIOS: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  rightView: {
    width: 60,
    height: 250,
    position: 'absolute',
    right: 0,
    bottom: 80
  },
  rightItemView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightItemText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5
  },
  footerView: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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
  }
})

export default withNavigation(ShortVideoCard)
