function a() {
  console.log('function a=>', a)
}

// 自执行函数 避免全局变量污染
// (function () {
//   // 块级作用域
//   function a() {
//     console.log('function a=>', a)
//   }
// })()
