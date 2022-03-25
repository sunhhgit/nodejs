const puppeteer = require('puppeteer')

const MUSIC_URL = 'https://music.163.com/#/discover/playlist'

const main = async () => {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'

  const browser = await puppeteer.launch({
    headless: false,
    args: [ua]
  })

  const page = await browser.newPage()
  await page.goto(MUSIC_URL)

  const contentIframe = await page.frames().find(f => f.name() === 'contentFrame')
  const result = await contentIframe.evaluate(() => {
    const eleList = document.querySelectorAll('#m-pl-container > li')
    // console.log('eleList=>', eleList)
    const list = []
    for(let ele of eleList) {
      const img = ele.querySelector('.j-flag').getAttribute('src')
      const name = ele.querySelector('.tit').innerText
      const count = ele.querySelector('.nb').innerText
      const author = ele.querySelector('.nm').innerText
      list.push({
        img,
        name,
        count,
        author
      })
    }
    return Promise.resolve(list)
  })
  console.log('result=>', result)
}

main();
