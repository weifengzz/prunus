/**
 * 导出工具
 * 2018-12-11 11:32
 * @author koohead
 * @description 导出工具
 */

// 日志工具
import { getLogs, getLog, log, logWarn, logErr } from './log'
// 屏幕自适应适配
import px from './px'
// 本地存储
import storage from './storage'
// 取值
import clamp from './clamp'
// 随机数
import randomNumber from './random_number'
// 手机号码验证
import phoneAvailable from './phone_available'
// 友盟分享工具
import shareUtil from './umeng/ShareUtil'
// 友盟统计工具
import analyticsUtil from './umeng/AnalyticsUtil'
// 获取网络状态
import { getNetInfo, isNetConnected } from './netinfo'
// Linking 相关
import { openMarket, openTel, openWechat, openWebBrowser } from './linkings'

// 导出工具
export {
  getLogs,
  getLog,
  log,
  logWarn,
  logErr,
  px,
  storage,
  clamp,
  randomNumber,
  phoneAvailable,
  shareUtil,
  analyticsUtil,
  getNetInfo,
  isNetConnected,
  openMarket,
  openTel,
  openWechat,
  openWebBrowser
}
