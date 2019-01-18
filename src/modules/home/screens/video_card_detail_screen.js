/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Platform,
  StyleSheet
} from 'react-native'
import {
  cancelFullScreen,
  VideoScrollView
} from '../../../components'
import {
  VideoCardChildren
} from '../component'

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 卡片详情
 */
class VideoCardDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      datas: [
        {
          text: ``,
          backgroundColor: 'white',
          type: 3,
          img: '',
          videoUrl: 'https://video.pearvideo.com/mp4/adshort/20190114/cont-1505670-13478217_adpkg-ad_hd.mp4',
          videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
          key: '3'
        },
        {
          text: '',
          backgroundColor: 'white',
          type: 4,
          videoUrl: 'http://flv3.bn.netease.com/videolib1/1808/05/lQNaE924V/HD/lQNaE924V-mobile.mp4',
          videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
          key: '5'
        },
        {
          text: ``,
          backgroundColor: 'white',
          type: 3,
          img: '',
          videoUrl: 'https://video.pearvideo.com/mp4/adshort/20190114/cont-1505670-13478217_adpkg-ad_hd.mp4',
          videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
          key: '3'
        },
        {
          text: '',
          backgroundColor: 'white',
          type: 4,
          videoUrl: 'http://flv3.bn.netease.com/videolib1/1808/05/lQNaE924V/HD/lQNaE924V-mobile.mp4',
          videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
          key: '5'
        },
        {
          text: ``,
          backgroundColor: 'white',
          type: 3,
          img: '',
          videoUrl: 'https://video.pearvideo.com/mp4/adshort/20190114/cont-1505670-13478217_adpkg-ad_hd.mp4',
          videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
          key: '3'
        }
      ]
    }
  }

  componentWillUnmount () {
    if (!IS_IOS) {
      cancelFullScreen()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <VideoScrollView
          onScrollEnd={(currentPage) => {}}
          datas={this.state.datas}
          childrenComponent={(item, index, currentPage) => {
            return (
              <VideoCardChildren data={item} currentPage={currentPage} />
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default VideoCardDetailScreen
