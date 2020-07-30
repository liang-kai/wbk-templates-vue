// import Vue from 'vue'
// import './style.css'
// const avatar = require('../../assets/user.png')
const close = require('../../assets/download.png')

import avatar from '../../assets/user.png'
// console.log(process.env)
if(process.env.NODE_ENV === 'production'){
  console.log('production')
}else if(process.env.NODE_ENV === 'development'){
  console.log('development')
}else if(process.env.NODE_ENV === 'test'){
  console.log('test')
}
// if(process.env.NO_ENV === 'test'){
//   console.log('no env')
// }
// if(process.env.zzz ==='web'){
//   console.log('web')
// }
console.log('xxx')

let image = new Image()
image.src = avatar
document.body.appendChild(image)

@log
class FOO{
  constructor(name){
    this.name = name
  }
}
const foo = new FOO()

function log(){}

([]).includes(2)

Promise.resolve().then(()=>{})