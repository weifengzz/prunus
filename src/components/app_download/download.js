/**
 * app下载
 * 2018-01-07 17:02
 * @author koohead
 * @description app下载
 */

import AppInstall from './app_install'
import RNFetchBlob from 'rn-fetch-blob'
import FileDirAndroid from '../file_dir'

/**
 * 下载并安装app
 * 'http://app.huamao001.cn/huamao_1.1.9.apk'
 */
const downloadAndInstallApp = ({
  useDownloadManager = true,
  notification = true,
  title = '下载',
  description = '下载app',
  appName,
  downLoadUrl,
  onError = () => {},
  onProgress = () => {},
  onSuccess = () => {}
}) => {
  const filePath = `${FileDirAndroid.externalStorageDirection}/prunus/downloads/${appName}.apk`
  RNFetchBlob
    .config({
      fileCache: true,
      appendExt: 'apk',
      trusty: true,
      addAndroidDownloads: {
        useDownloadManager,
        notification,
        title,
        description,
        mime: 'application/vnd.android.package-archive',
        mediaScannable: true,
        path: filePath
      }
    }).fetch('GET', downLoadUrl, {
    })
    .progress((received, total) => {
      onProgress(received, total)
    })
    .then((res) => {
      AppInstall.installApk(res.path())
      onSuccess()
    })
    .catch(err => {
      onError(err)
    })
}

export default downloadAndInstallApp
