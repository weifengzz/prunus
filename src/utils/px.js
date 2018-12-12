/**
 * 屏幕自适应适配
 * 2018-12-12 10:14
 * @author koohead
 * @description 屏幕自适应适配
 */

import {
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native'

const deviceWidth = Dimensions.get('window').width

/**
 * 屏幕自适应适配
 * @param {number} size 尺寸
 */
const px = (size) => {
  if (PixelRatio.get() >= 3 && Platform.OS === 'ios' && size === 1) {
    return size
  }
  return deviceWidth / 750 * size
}

export default px
