const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // 清除目录
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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

// console.log(process.env)

const commonConfig = {
  entry: entries,
  output: {
		filename: '[name].[hash:8].js', // 打包后的文件名
		path: __dirname + '/dist', // 输出目录
		publicPath: '/', // 静态资源host
  },
  plugins:[
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  resolve:{
    extensions:['.js','.vue','.json']
  },
  module:{
    rules: [
      {
        test:/\.(css|less)$/,
        use:[
          'vue-style-loader',
          {
            loader: 'css-loader',
            options:{
              // enable css Modules
              modules: true
            }
          },
          // 'postcss-loader',
          'less-loader'
        ]
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.js$/,
        loader: 'babel-loader'
      },
      {
				test: /(png|jpe?g|svg|gif)$/,
				use: {
					// file-loader 图片引入，生成一个地址
					// url-loader 生成base64
					loader: 'url-loader',
					options: {
						limit: 1024, // 限制大小
					},
				},
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          'file-loader'
        ]
      }
    ]
  }
}
// 多出口
Object.keys(entries).forEach(outfile =>{
  commonConfig.plugins.push(	
    new HtmlWebpackPlugin({
      title: outfile,
      template: path.resolve(__dirname, './src/index.html'),
      filename: `${outfile}.html`, // 输出文件名称
			chunks: [outfile],
  }))
})




module.exports = commonConfig