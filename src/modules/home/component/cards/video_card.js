/**
 * 视频卡片组件
 * 2019-01-15 10:21
 * @author koohead
 * @description 视频卡片组件
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
  CoverImage,
  SpliteLine,
  Icon
} from '../../../../components'
import { withNavigation } from 'react-navigation'
import Video from 'react-native-video'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 滑动卡片
 */
class VideoCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: true,
      isFirstLoad: true
    }
  }

  componentDidMount () {
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        if (!this.state.isFirstLoad) {
          this.play()
        }
      }
    )
  }

  componentWillUnmount () {
    this.didBlurSubscription && this.didBlurSubscription.remove()
  }

  play () {
    this.setState({
      paused: false
    })
  }

  paused () {
    this.setState({
      paused: true
    })
  }

  _renderContent () {
    return (
      <View style={styles.contentView}>
        {this._renderBackView()}
        {this._renderImage()}
        {this._renderHeaderView()}
        {this._renderVideo()}
        {this._renderFooterView()}
      </View>
    )
  }

  /**
   * 渲染头部界面
   */
  _renderHeaderView () {
    return (
      <View style={styles.headerView}>
        <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
        <View style={styles.headerContentView}>
          <Text style={styles.headerNameText}>我叫白小飞</Text>
          <Text style={styles.timeText}>10分钟前</Text>
        </View>
        <View style={{ marginRight: 10 }}>
          <Icon size={22} color={'white'} name={'sharealt'} type={'ant_design'} />
        </View>
      </View>
    )
  }

  /**
   * 渲染底部界面
   */
  _renderFooterView () {
    return (
      <View style={styles.footerView}>
        <View style={[styles.footerItemView, { flex: 3 }]}>
          <Text numberOfLines={2} style={styles.descText}>当地时间1月14日，特朗普在白宫宴请获得全美大学美式足球赛冠军的克莱门森大学老虎足球队队员，令人惊讶的是食物全是来自麦当劳、汉堡王的汉堡、薯条、沙拉等速食。因为政府关门，白宫没人上班，他自费订购了这些</Text>
        </View>
        <SpliteLine />
        <View style={[styles.footerItemView, { flex: 2 }]}>
          <View style={styles.itemLeftView}>
            <Icon size={18} color={'#c3dcdd'} name={'smileo'} type={'ant_design'} />
            <Text style={styles.commonSmallText}>100</Text>
            <View style={{ width: 20 }} />
            <Icon size={20} color={'#c3dcdd'} name={'eyeo'} type={'ant_design'} />
            <Text style={styles.commonSmallText}>3.5k</Text>
          </View>
          <Icon size={18} color={'red'} name={'heart'} type={'ant_design'} />
          <Text style={styles.commonSmallText}>2.2k</Text>
          <View style={{ width: 20 }} />
          <Icon size={18} color={'#c3dcdd'} name={'message1'} type={'ant_design'} />
          <Text style={styles.commonSmallText}>80</Text>
        </View>
      </View>
    )
  }

  /**
   * 渲染背景界面
   */
  _renderBackView () {
    return (
      <View />
    )
  }

  /**
   * 背景图片
   */
  _renderImage () {
    const { videoImg } = this.props
    return (
      <View style={IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid}>
        <Image blurRadius={IS_IOS ? 80 : 20} source={{ uri: videoImg }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
        <View style={[IS_IOS ? styles.imageViewIOS : styles.imageViewAndroid, { backgroundColor: 'black', opacity: 0.3, borderRadius: 10 }]} />
      </View>
    )
  }

  /**
   * 视频
   */
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
    if (ch >= cw * 9 / 16) {
      vw = cw
      vh = vw * 9 / 16
    } else {
      vh = ch
      vw = vh * 16 / 9
    }
    return (
      <Video
        source={{ uri: videoUrl }}
        ref={(ref) => {
          this.player = ref
        }}
        paused={this.state.paused}
        repeat
        style={{ height: vh, width: vw }} />
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
          this.paused()
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

VideoCard.getDerivedStateFromProps = (nextProps, state) => {
  if (state.paused !== nextProps.paused && state.isFirstLoad) {
    return {
      paused: nextProps.paused,
      isFirstLoad: false
    }
  }
  return null
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
      width: 4,
      height: 4
    },
    shadowOpacity: 0.7,
    shadowRadius: 10
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
  headerView: {
    flex: 1,
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
  timeText: {
    fontSize: 12,
    marginTop: 5,
    color: 'white'
  },
  footerView: {
    flex: 2
  },
  descText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 20,
    marginBottom: 10
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
  }
})

export default withNavigation(VideoCard)
