import {
  NetInfo
} from 'react-native'

// 获取网络状态
export const getNetInfo = async () => {
  let connectionInfo = await NetInfo.getConnectionInfo()
  return connectionInfo.type
}
// 判断设备是否联网
export const isNetConnected = () => {
  NetInfo.isConnected.fetch().done((isConnected) => {
    return isConnected
  })
}
