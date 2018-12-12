/**
 * 本地存储
 * 2018-12-12 10:22
 * @author koohead
 * @description 封装本地存储
 */

import { AsyncStorage } from 'react-native'

/**
 * 获取存储的数据
 * @param {string} key
 */
const getItem = async (key) => {
  let item = await AsyncStorage.getItem(key)
  if (!item) {
    return null
  }
  return JSON.parse(item).v || null
}
/**
 * 存入数据
 * @param {*} key
 * @param {*} value
 */
const setItem = (key, value) => AsyncStorage.setItem(key, JSON.stringify({
  v: value
}))

/**
 * 删除已经存在的数据
 * @param {*} key
 */
const removeItem = (key) => AsyncStorage.removeItem(key)

/**
 * 清除所有
 */
const clear = () => AsyncStorage.clear()

/**
 * 获取所有的key
 */
const getAllKeys = () => AsyncStorage.getAllKeys()

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  getAllKeys
}
