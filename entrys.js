const path = require('path')
const fs = require('fs')
// import {pathConcat} from './utils'

// note: 后续可以支持多模块打包
const argvs = process.argv.slice(2) // 获取当前模块参数
const curModule = argvs.slice(2)
// console.log(argvs)
const entries = {}
let pages = []
let pathPages = fs.readdirSync(__dirname+"/src/modules",{withFileTypes: true});
console.log(pages)

pathPages.forEach(p=>{
  if(p.isDirectory()){
    const templatePath = __dirname + `/src/modules/${p.name}/index.html`
    const entryPath = __dirname + `/src/modules/${p.name}/main.js`
    try{
      fs.accessSync(templatePath, fs.constants.R_OK)
      pages.push({name: p.name, templatePath, entryPath})
    }catch(e){
      pages.push({name: p.name, entryPath})
    }
  }
})
console.log(pages)
// console.log(pages)
// if (curModule.length) {
//   pages = pages.filter((p)=>curModule.includes(p))
// }
// pages.forEach((page) => {
//   entries[page] = `./src/modules/${page}/main.js`
// })
module.exports = entries
