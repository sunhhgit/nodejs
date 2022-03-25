const fs = require('fs')
const path = require('path')

const axios = require('axios')
const cheerio = require('cheerio')

const orgUrl = 'https://www.bigbigwork.com/tupian/fengjing23_1.html'

axios.get(orgUrl).then(res => {
  const data = res.data
  // console.log('data=>', data, typeof data) // string类型
  const $ = cheerio.load(data)
  const $imgs = $('#items img')
  // jquery里面的map参数是 序号，元素 的顺序
  const result = $imgs.map((index, img) => {
    const src = $(img).attr('src')
    const url = src.split('?')[0]
    const id = url.split('/').pop()
    console.log('src=>', src, id)
    return axios.get(src, {
      "headers": {
        "method": 'GET',
        "accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "accept-language": 'zh-CN,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6',
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-fetch-dest": "image",
        "sec-fetch-site": 'same-origin',
        "sec-fetch-mode": 'empty',
        "referer": orgUrl,
        "path": '/jpe/25fd09bf4d2316efc99372c75cb235cf.jpg?x-oss-process=style/pc_236_jpg ',
        "scheme": 'https'
      },
      responseType: 'arraybuffer'
    }).then(imgRes => {
      const buffer = Buffer.from(imgRes.data, 'binary')
      fs.writeFileSync(path.resolve(__dirname, `./img/${id}`), buffer)
    }).catch(e => {
      console.log('error=>', e)
    })
  })
  Promise.all(result)
})



// const fetch = require('node-fetch')
//
// fetch("https://www.bigbigwork.com/tupian/shu49_1.html?h=%E5%85%A8%E9%83%A8", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1",
//     "cookie": "number=6159525; _ga=GA1.2.1189715247.1587906872; Qs_lvt_147946=1587906873; Hm_lvt_d24dcf008a97469875a4da33090711f9=1587906873; JSESSIONID=B4E3A6FFEDF9EEE543F9E413BEE81B21; _gid=GA1.2.1569419909.1587907394; Hm_lpvt_d24dcf008a97469875a4da33090711f9=1587907394; Qs_pv_147946=308527974837110500%2C4267322968940402700%2C2714649838555185000%2C222816005495245820; loginQrcodeUrl=http://weixin.qq.com/q/02qUyQs_I39lU1zHQDNucW; ticket=gQEp8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAycVV5UXNfSTM5bFUxekhRRE51Y1cAAgQLj6VeAwTgpQEA; expireSeconds=108000"
//   },
//   "referrer": "https://www.bigbigwork.com/",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": null,
//   "method": "GET",
//   "mode": "cors"
// })
//   .then(resp => console.log(resp))
