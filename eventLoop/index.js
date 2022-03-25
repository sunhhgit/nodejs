const fs = require('fs')

const startTime = Date.now()
setTimeout(() => {
  const endTime = Date.now()
  console.log(`setTimeout times=> 第${endTime - startTime}毫秒`)
}, 1000)

const readFileTime = Date.now()
console.log(`开始读文件 times=> 第${readFileTime - startTime}毫秒`)
fs.readFile('./a.txt', (err, data) => {
  if(err) throw err;
  let readFileEndTime = Date.now()
  console.log(`read file times=> 用时${readFileEndTime - readFileTime}毫秒， 第${readFileEndTime - startTime}毫秒`)
  while (readFileEndTime - readFileTime < 3000) {
    readFileEndTime = Date.now()
  }
  console.log(`阻塞时间时间 times=> ${readFileEndTime - readFileTime}毫秒， 第${readFileEndTime - startTime}毫秒`)
})

setImmediate(() => {
  const checkTime = Date.now()
  console.log(`进入 setImmediate check阶段 第${checkTime - startTime}毫秒`)
})
