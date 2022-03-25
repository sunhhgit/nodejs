#!/usr/bin/env node
// console.log(process.argv) // 解析打印参数
const { program } = require('commander')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

let config = {}
try{
  // config = require('./cli-config')
  // process.cwd() 执行文件的目录
  config = require(path.resolve(process.cwd(), 'cli-config-base'))
}catch (e) {
}

const { plugins = [] } = config

program.arguments('<dir>')
  .description('this is cli written directory')
  .action((dir) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'which framework do you like better?',
        choices: ['vue', 'react']
      }
    ]).then(answer => {
      const content = fs.readFileSync(path.resolve(__dirname, './index.boilerplate'), 'utf-8')
      const result = content.replace('_template', answer.framework)

      // @module-plugin-import
      plugins.forEach(plugin => {
        const pluginModule = require(`@module-plugin-${plugin}`)
        pluginModule(result, dir)
      })

      fs.writeFileSync(path.resolve(process.cwd(), dir), result, 'utf-8')
    })

    // node index.js react.js

    // 在package.json 添加 "bin": { "cli": "./index.js" } 命令
    // 在 index.js 头部添加 #!/usr/bin/env node 指定node类型脚本执行
    // 执行 npm link 建立两个远链接, 在其他目录执行 cli demo.js等命令可以生成相应的文件

    // 加载 @module-plugin-log 插件
    // 1、在 nodejs 目录下是node_modules目录下新建 @module-plugin-log 插件
    // 2、修改 config 的引入，引入nodejs 目录下的 cli-config-base.js
  })

// node index.js -help
// node index.js dirTest


program.parse(process.argv)
