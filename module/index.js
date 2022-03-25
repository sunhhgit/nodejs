/**
 * require 引入模块的方法
 * module 记录当前模块的信息
 * exports 当前模块导出的属性
 */

const a = require('./a')
// const b = require('./b')
console.log('入口文件')
a.say()
