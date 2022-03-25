const say = require('./a')
const obj = {
  name: 'bbb',
  user: 'modB'
}
console.log('我是b模块')
console.log('打印a模块say', say)
setTimeout(() => {
  console.log('异步打印a模块 say方法', say)
}, 0)
module.exports = function () {
  return obj
}
