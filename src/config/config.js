/**
 * 配置
 * 2018-12-24 10:44
 * @author koohead
 * @description 配置
 */
import FileDirAndroid from '../components/file_dir'
import {
  Platform
} from 'react-native'
import {
  RNFetchBlob
} from '../components'

// 开屏广告显示间隔时间
const OPEN_SCREEN_TIME_DIFF = 60
// 开屏广告倒计时时间
const OPEN_SCREEN_REAMINI_TIME = 5
// app下载文件存储地址
const APP_DOWNLOAD_FILE_PATH = Platform.OS === 'android' ? `${FileDirAndroid.externalStorageDirection}/prunus/downloads/` : ''
// app缓存文件存储地址
const AD_IMAGE_FILE_PATH = Platform.OS === 'android' ? `${FileDirAndroid.externalStorageDirection}/prunus/ad_images/` : `${RNFetchBlob.fs.dirs.DocumentDir}/`

export {
  OPEN_SCREEN_TIME_DIFF,
  OPEN_SCREEN_REAMINI_TIME,
  APP_DOWNLOAD_FILE_PATH,
  AD_IMAGE_FILE_PATH
}
