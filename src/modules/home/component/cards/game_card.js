/**
 *  游戏卡片组件
 * 2018-12-14 14:13
 * @author koohead
 * @description 游戏卡片组件
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Platform,
  Text,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native'
import {
  TouchableOpacity,
  LinearGradient,
  Icon,
  downloadAndInstallApp,
  Toast
} from '../../../../components'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 滑动卡片
 */
class GameCard extends Component {
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
        <Image source={{ uri: cardData.gameImg }} style={IS_IOS ? styles.imageIOS : styles.imageAndroid} />
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
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)']}
        style={styles.descView}
      >
        <View style={styles.headerView}>
          <Icon size={20} color={'white'} name={'sharealt'} type={'ant_design'} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.footerView}>
          <View style={styles.descContentView}>
            <Text numberOfLines={2} style={styles.descNameText}>{cardData.text}</Text>
          </View>
          {
            cardData.downLoadUrl && !IS_IOS
              ? <TouchableOpacity
                onPress={() => {
                  this.managerDownloadApp()
                }}
                style={styles.optionView}>
                <Text style={styles.optionText}>{'下载'}</Text>
              </TouchableOpacity>
              : null
          }

        </View>
      </LinearGradient>
    )
  }

  /**
 * 下载管理器下载文件
 */
  async managerDownloadApp () {
    if (!IS_IOS) {
      // 判断用户是否有存储权限权限
      if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) {
        this.managerDownload()
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              'title': '申请空间存储权限',
              'message': '请开通空间存储权限，否则应用无法正常下载！'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.managerDownload()
          } else {
            ToastAndroid.show('请开通空间存储权限，否则应用无法正常下载！', ToastAndroid.SHORT)
          }
        } catch (err) {
          ToastAndroid.show('请开通空间存储权限，否则应用无法正常下载！', ToastAndroid.SHORT)
        }
      }
    }
  }

  managerDownload () {
    const { cardData } = this.props
    downloadAndInstallApp({
      useDownloadManager: true,
      notification: true,
      title: `下载${cardData.title || '应用'}`,
      description: `${cardData.text || '快来玩啊'}`,
      appName: cardData.title || '应用',
      downLoadUrl: cardData.downLoadUrl,
      onError: () => {},
      onProgress: (received, total) => {},
      onSuccess: () => {}
    })
    this.setState({
      modalVisible: false
    })
    Toast.show(`开始下载${cardData.title || '应用'}`, {
      position: Toast.positions.CENTER
    })
  }

  render () {
    const { cardHeight, stackOffsetY, stackDepth, navigation, webUrl, cardData } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('ad_detail', { webUrl })
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

GameCard.defaultProps = {
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
  descContentView: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1
  },
  descNameText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 25
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
  },
  optionView: {
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    opacity: 0.7
  },
  optionText: {
    fontSize: 12,
    color: 'white'
  }
})

export default withNavigation(GameCard)
