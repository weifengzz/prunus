/**
 * android 全屏界面
 * 2019-01-11 10:42
 * @author koohead
 * @description android 全屏界面 可用于小视频全屏播放
 */
import { NativeModules, Platform } from 'react-native'
let FullScreenAndroid = NativeModules.FullScreenAndroid
const IS_ANDROID = Platform.OS === 'android'

/**
 * 全屏幕
 */
const fullScreen = () => {
  IS_ANDROID && FullScreenAndroid.fullScreen()
}

const cancelFullScreen = () => {
  IS_ANDROID && FullScreenAndroid.cancelFullScreen()
}

export {
  fullScreen,
  cancelFullScreen
}
