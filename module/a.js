
console.log('我是a模块')
const say = function () {
  const getMsg = require('./b')
  const msg = getMsg()
  console.log('a模块调用b模块 msg =>', msg)
}
exports.say = say
