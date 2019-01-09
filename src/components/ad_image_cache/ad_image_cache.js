/**
 * 图片缓存功能
 * 2018-01-09 11:04
 * @author koohead
 * @description 图片缓存功能
 */
import { AD_IMAGE_FILE_PATH } from '../../config/config'
import RNFetchBlob from 'rn-fetch-blob'
import { uuid } from '../../utils'

/**
 * 图片缓存
 * @param {*} imgUrl 图片地址
 * @param {*} imgName 图片名称
 * @param {*} onSuccess 存储成功
 * @param {*} onError 存储异常
 */
export const adImageCache = ({ imgUrl, imgName, onSuccess = () => {}, onError = () => {} }) => {
  try {
    let formatIndex = imgUrl.lastIndexOf('.')
    let formatName = imgUrl.substring(formatIndex, imgUrl.length)
    let imageName = imgName || uuid() + formatName
    let filePath = AD_IMAGE_FILE_PATH + imageName
    // 判断文件是否存在
    RNFetchBlob.fs.exists(filePath)
      .then((exist) => {
        if (exist) {
          onSuccess(filePath)
        } else {
          cacheImg(imgUrl, filePath, formatName, onSuccess, onError)
        }
      })
      .catch(() => {
        cacheImg(imgUrl, filePath, formatName, onSuccess, onError)
      })
  } catch (e) {
    onError(e)
  }
}

/**
 * 缓存图片
 * @param {*} imgUrl 图片地址
 * @param {*} filePath 文件存储地址
 * @param {*} formatName 文件扩展名
 * @param {*} onSuccess 成功回调
 * @param {*} onError 失败回调
 */
const cacheImg = (imgUrl, filePath, formatName, onSuccess, onError) => {
  RNFetchBlob
    .config({
      fileCache: true,
      path: filePath,
      appendExt: formatName
    })
    .fetch('GET', imgUrl, {
    })
    .then((res) => {
      onSuccess(res.path())
      console.log('res.path()', res.path())
    })
    .catch((err) => {
      onError(err)
    })
}

/**
 * 删除图片缓存
 * @param {*} filePath 文件地址
 * @param {*} onSuccess 删除成功
 * @param {*} onError 删除失败
 */
export const deleteAdImageCache = ({ filePath, onSuccess = () => {}, onError = () => {} }) => {
  RNFetchBlob.fs.unlink(filePath)
    .then(() => {
      onSuccess()
    })
    .catch((err) => {
      onError(err)
    })
}
