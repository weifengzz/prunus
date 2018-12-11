/**
 * Log日志封装
 * 2018-12-11 11:31
 * @author koohead
 * @description Log日志封装
 */

// 日志存放
const logs = []

// 如果日志超过200条去掉最早的那条日志
const add = (log) => {
  logs.push(log)
  if (logs.length > 200) {
    logs.shift()
  }
}

// 返回log信息
const getLogs = () => {
  return logs
}

// 获取单个日志内容
const getLog = (index) => {
  return logs[index]
}

// 输出信息
const log = (...args) => {
  add(args)
  if (__DEV__) {
    const info = args.concat()
    info[0] = '%c' + info[0]
    info.splice(1, 0, 'color: #2d8cf0')
    console.log(...info)
  }
}

// 输出警告
const logWarn = (...args) => {
  add(args)
  if (__DEV__) {
    const info = args.concat()
    info[0] = '%c' + info[0]
    info.splice(1, 0, 'color: #FF9900')
    console.log(...info)
  }
}

// 输出警告
const logErr = (...args) => {
  add(args)
  if (__DEV__) {
    const info = args.concat()
    info[0] = '%c' + info[0]
    info.splice(1, 0, 'color: #FF0000')
    console.log(...info)
  }
}

// 导出组件
export {
  getLogs,
  getLog,
  log,
  logWarn,
  logErr
}
