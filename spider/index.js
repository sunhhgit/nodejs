const fs = require('fs')
const path = require('path')

const axios = require('axios')
const url = 'https://unsplash.com/napi/search/photos?query=tree&xp=&per_page=20&page=3'

axios.get(url).then(res => {
  const result = res.data ? res.data.results : []
  result.forEach(item => {
    const imgUrl = item.urls.full
    const id = item.id
    axios.get(imgUrl, {
      responseType: 'arraybuffer'
    }).then(imgRes => {
      const dir = path.resolve(__dirname, './img/');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      const buffer = Buffer.from(imgRes.data, 'binary')
      fs.writeFileSync(path.resolve(__dirname, `./img/${id}.jpg`), buffer)
    })
  })
})
