/**
 * app下载
 * 2018-01-07 17:02
 * @author koohead
 * @description app下载
 */

import AppInstall from './app_install'
import RNFetchBlob from 'rn-fetch-blob'
import { APP_DOWNLOAD_FILE_PATH } from '../../config/config'
import Toast from '../toast'

/**
 * 下载并安装app
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
  onSuccess = () => {},
  alwaysDownload = false
}) => {
  const filePath = `${APP_DOWNLOAD_FILE_PATH}${appName}.apk`
  // 总是下载
  if (alwaysDownload) {
    downlaod({
      useDownloadManager,
      notification,
      title,
      description,
      filePath,
      downLoadUrl,
      onProgress,
      onSuccess,
      onError
    })
  } else {
    // 判断文件是否存在
    RNFetchBlob.fs.exists(filePath)
      .then((exist) => {
        if (exist) {
          AppInstall.installApk(filePath)
        } else {
          downlaod({
            useDownloadManager,
            notification,
            title,
            description,
            filePath,
            downLoadUrl,
            onProgress,
            onSuccess,
            onError
          })
        }
      })
      .catch(() => {
        Toast.show('文件系统发生未知错误')
        downlaod({
          useDownloadManager,
          notification,
          title,
          description,
          filePath,
          downLoadUrl,
          onProgress,
          onSuccess,
          onError
        })
      })
  }
}

const downlaod = ({
  useDownloadManager,
  notification,
  title,
  description,
  filePath,
  downLoadUrl,
  onProgress,
  onSuccess,
  onError
}) => {
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
