/**
 * 文件操作
 * 2019-01-10 16:23
 * @author koohead
 * @description 导出组件
 */
import RNFetchBlob from 'rn-fetch-blob'

/**
 * 判断文件路径是否存在文件
 * @param {*} filePath 文件路径
 */
export const fileExists = (filePath, callBack) => {
  if (!filePath) {
    callBack(false)
  } else {
    // 判断文件是否存在
    RNFetchBlob.fs.exists(filePath)
      .then((exist) => {
        if (exist) {
          callBack(true)
        } else {
          callBack(false)
        }
      })
      .catch(() => {
        callBack(false)
      })
  }
}
