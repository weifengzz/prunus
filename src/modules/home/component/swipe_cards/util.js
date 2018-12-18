/**
 * 首页切换组件工具类
 * 2018-12-18 09:58
 * @author koohead
 * @description 首页切换组件工具类
 */
import Dimensions from 'Dimensions'

const { width: G_WIDTH } = Dimensions.get('window')

// iphone-se的宽度
const IPHONE_SE_WIDTH = 320
// iphonex的宽度
const IPHONE_X = 375
// iphone-se的系数
const IPHONE_X_DEC = 0.9865

/**
 * 获取速度系数
 * @param {*} coefficient 系数
 */
const getVX = (coefficient) => {
  return (G_WIDTH / IPHONE_SE_WIDTH * coefficient).toFixed(3)
}

/**
 * 获取衰减系数
 * @param {*} coefficient 系数
 */
const getDeceleration = (coefficient) => {
  const c = (IPHONE_X_DEC - coefficient) / (IPHONE_X - IPHONE_SE_WIDTH)
  let r = Number(((G_WIDTH - IPHONE_SE_WIDTH) * c).toFixed(3)) + coefficient
  return r < 1 ? r : 0.99
}

export {
  getVX,
  getDeceleration
}
