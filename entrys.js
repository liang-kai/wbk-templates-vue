const path = require('path')
const fs = require('fs')
// import {pathConcat} from './utils'

// note: 后续可以支持多模块打包
const argvs = process.argv.slice(2) // 获取当前模块参数
const curModule = argvs.slice(2)
// console.log(argvs)
const entries = {}
let pages = fs.readdirSync(path.resolve(__dirname, './src/modules'))
if (curModule.length) {
  pages = pages.filter((p)=>curModule.includes(p))
}
pages.forEach((page) => {
  entries[page] = `./src/modules/${page}/main.js`
})
module.exports = entries
