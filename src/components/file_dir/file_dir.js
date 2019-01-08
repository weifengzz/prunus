/**
 * 获取文件存储路径
 * 2019-01-07 11:59
 * @author koohead
 * @description 获取文件存储路径
 */

import {
  NativeModules,
  Platform
} from 'react-native'
let FileDir = NativeModules.FileDirAndroid

let FileDirAndroid = Platform.OS === 'android' ? {
  directoryMusic: FileDir.DIRECTORY_MUSIC,
  directoryPodcasts: FileDir.DIRECTORY_PODCASTS,
  directoryRingtones: FileDir.DIRECTORY_RINGTONES,
  directoryAlarms: FileDir.DIRECTORY_ALARMS,
  directoryNotifications: FileDir.DIRECTORY_NOTIFICATIONS,
  directoryPictures: FileDir.DIRECTORY_PICTURES,
  directoryMovies: FileDir.DIRECTORY_MOVIES,
  directoryDownloads: FileDir.DIRECTORY_DOWNLOADS,
  directoryDcim: FileDir.DIRECTORY_DCIM,
  directoryDocuments: FileDir.DIRECTORY_DOCUMENTS,
  downloadCacheDirection: FileDir.DOWNLOAD_CACHE_DIRECTION,
  dataDirection: FileDir.DATA_DIRECTION,
  externalStorageDirection: FileDir.EXTERNAL_STORAGE_DIRECTION,
  externalFilesDir: FileDir.EXTERNAL_FILES_DIR,
  cacheDir: FileDir.CACHE_DIR,
  filesDir: FileDir.FILES_DIR,
  externalCacheDir: FileDir.EXTERNAL_CACHE_DIR
} : {}

export default FileDirAndroid
