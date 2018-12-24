// 生成从minNum到maxNum的随机数
const randomNumber = (n, m) => {
  var random = Math.floor(Math.random() * (m - n + 1) + n)
  return random
}

export default randomNumber
