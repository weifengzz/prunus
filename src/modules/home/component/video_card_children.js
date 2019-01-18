/**
 * 视频组件卡片详情界面组件
 * 2018-01-18 15:48
 * @author koohead
 * @description 视频组件卡片详情界面组件
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import {
  Icon,
  CoverImage
} from '../../../components'
import Video from 'react-native-video'

const { width: G_WIDTH } = Dimensions.get('window')
const IS_IOS = Platform.OS === 'ios'

class VideoCardChildren extends Component {
  _renderHeaderView () {
    return (
      <SafeAreaView style={styles.headerView}>
        <TouchableOpacity style={styles.backBtn}>
          <Icon size={22} color={'#c3dcdd'} name={'left'} type={'ant_design'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleView}>
          <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>我叫白小飞</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn}>
          <Icon size={20} color={'#c3dcdd'} name={'sharealt'} type={'ant_design'} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  _renderFooterView () {
    return (
      <View style={styles.footerView}>
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
  render () {
    const { data, currentPage } = this.props
    return (
      <View style={styles.container}>
        {
          currentPage
            ? <Video
              source={{ uri: data.videoUrl }}
              ref={(ref) => {
                this.player = ref
              }}
              paused={false}
              repeat
              style={{ flex: 1 }} />
            : <View style={{ flex: 1 }} />
        }
        { this._renderFooterView() }
        { this._renderHeaderView() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerView: {
    width: G_WIDTH,
    height: IS_IOS ? 50 : 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
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
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: IS_IOS ? 24 : StatusBar.currentHeight + 24,
    height: 70,
    width: G_WIDTH,
    flexDirection: 'row'
  },
  backBtn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerImage: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  titleTextView: {
    marginLeft: 8,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default VideoCardChildren
