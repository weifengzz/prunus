/**
 * Linking 打开相关地址
 * 2018-01-09 09:22
 * @author koohead
 * @description Linking 打开相关地址
 */

import {
  Platform,
  Linking,
  Clipboard,
  Alert
} from 'react-native'
import { Toast } from '../../src/components'

/**
 * app应用市场下载
 * iOS： itms-apps://itunes.apple.com/cn/app/  +【名称】/【id + id编号】 如：itms-apps://itunes.apple.com/cn/app/wei-xin/id414478124
 * android: market://details?id= + 【app 包名】 如： market://details?id=com.tencent.mm
 * @param {*} address 下载地址
 */
export const openMarket = ({ androidAddress = '', iOSAddress = '' }) => {
  const linkingUrl = Platform.OS === 'ios' ? `itms-apps://itunes.apple.com/cn/app/${iOSAddress}` : `market://details?id=${androidAddress}`
  Linking.canOpenURL(linkingUrl).then(async supported => {
    if (supported) {
      Linking.openURL(linkingUrl)
    } else {
      Toast.show('找不到可提供下载的应用市场')
    }
  })
}

/**
 * 拨打手机
 * @param {*} tel 手机号
 */
export const openTel = (tel) => {
  Linking.canOpenURL(`tel:${tel}`).then(async supported => {
    if (supported) {
      Linking.openURL(`tel:${tel}`)
    } else {
      await Clipboard.setString(tel)
      Toast.show('您的设备不支持，已为您复制手机号！')
    }
  })
}

/**
 * 打开微信
 */
export const openWechat = () => {
  Linking.canOpenURL('weixin://').then(supported => {
    if (supported) {
      Linking.openURL('weixin://')
    } else {
      Alert.alert('没有安装微信',
        '请先安装微信客户端再打开',
        [
          { text: '取消' },
          { text: '安装',
            onPress: () => {
              openMarket({
                androidAddress: 'com.tencent.mm',
                iOSAddress: 'wei-xin/id414478124'
              })
            } }
        ])
    }
  })
}

/**
 * 打开浏览器
 * @param {*} url url地址
 */
export const openWebBrowser = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    } else {
      Toast.show('找不到可以打开的浏览器')
    }
  })
}
