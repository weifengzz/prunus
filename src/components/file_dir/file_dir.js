/**
 * 获取文件存储路径
 */
let { NativeModules } = require('react-native')
let FileDir = NativeModules.FileDirAndroid

let FileDirAndroid = {}
FileDirAndroid.directoryMusic = FileDir.DIRECTORY_MUSIC
FileDirAndroid.directoryPodcasts = FileDir.DIRECTORY_PODCASTS
FileDirAndroid.directoryRingtones = FileDir.DIRECTORY_RINGTONES
FileDirAndroid.directoryAlarms = FileDir.DIRECTORY_ALARMS
FileDirAndroid.directoryNotifications = FileDir.DIRECTORY_NOTIFICATIONS
FileDirAndroid.directoryPictures = FileDir.DIRECTORY_PICTURES
FileDirAndroid.directoryMovies = FileDir.DIRECTORY_MOVIES
FileDirAndroid.directoryDownloads = FileDir.DIRECTORY_DOWNLOADS
FileDirAndroid.directoryDcim = FileDir.DIRECTORY_DCIM
FileDirAndroid.directoryDocuments = FileDir.DIRECTORY_DOCUMENTS
FileDirAndroid.downloadCacheDirection = FileDir.DOWNLOAD_CACHE_DIRECTION
FileDirAndroid.dataDirection = FileDir.DATA_DIRECTION
FileDirAndroid.externalStorageDirection = FileDir.EXTERNAL_STORAGE_DIRECTION
FileDirAndroid.externalFilesDir = FileDir.EXTERNAL_FILES_DIR
FileDirAndroid.cacheDir = FileDir.CACHE_DIR
FileDirAndroid.filesDir = FileDir.FILES_DIR
FileDirAndroid.externalCacheDir = FileDir.EXTERNAL_CACHE_DIR

export default FileDirAndroid
