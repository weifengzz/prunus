/**
 * 手机好吗验证
 * @param {*} phone 手机号
 * @returns 是否符合格式
 */
const phoneAvailable = (phone) => {
  let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}

export default phoneAvailable
