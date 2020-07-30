const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除目录
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// import {pathConcat} from './utils'

// note: 后续可以支持多模块打包
const argvs = process.argv.slice(2); // 获取当前模块参数
const curModule = argvs.slice(2);


let pages = []
let pathPages = fs.readdirSync(__dirname + "/src/modules",{withFileTypes: true});
// console.log(pages)

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

const entries = pages.reduce((acc, cur)=>{
  acc[cur.name] = cur.entryPath
  return acc
},{});

const htmlPlugins = pages.map((cur, idx)=>{
  return new HtmlWebpackPlugin({
    title: cur.name,
    template: cur.templatePath || __dirname + '/src/index.html',
    filename: `${cur.name}.html`, // 输出文件名称
    chunks: [cur.name],
  })
})

const commonConfig = {
  entry: entries,
  output: {
    filename: "[name].bundle.js", // 打包后的文件名
    path: __dirname + "/dist", // 输出目录
    assetModuleFilename: "asset/[hash][ext]",
    // publicPath: '/assets/', // 静态资源host
  },
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin(), ...htmlPlugins],
  resolve: {
    extensions: [".js", ".vue", ".json"],
  },
  experiments: {
    asset: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // type: 'asset',
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              // enable css Modules
              modules: true,
            },
          },
          // 'postcss-loader',
          "less-loader",
        ],
        // generator: {
        //   filename: 'css/[hash][ext]'
        // }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // publicPath:'./js'
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }], // 支持装饰器,
            "@babel/plugin-transform-runtime",
          ],
        },
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1,
          },
        },
        // generator: {
        //   filename: 'images/[hash][ext]'
        // }
        // use: [{
        //   // file-loader 图片引入，生成一个地址
        //   // url-loader 生成base64
        //   loader: "url-loader",
        //   options: {
        //     limit: 1024, // 限制大小
        //   },
        // }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};

module.exports = commonConfig;
