const path                    = require('path')
const _                       = require("lodash")
const webpack                 = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var BUILD_DIR = path.resolve(__dirname, 'dist/')
var APP_DIR = path.resolve(__dirname, 'src/')


//This is an example of a single entry script build for a react/single-page app. Hence "main"
//For a multi-page site build, you'll want to create entries for each page script instead.
const buildConfig = (options = {}) => {
  _.defaults(options, {optimize: true})
  let {name} = options
  var config = {
    entry: {}
    ,output: {
      path: BUILD_DIR,
      filename: "index.bundle.js" //this [name] is the entry name. i.e. 'main'
    }
    ,plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
      ,new BundleAnalyzerPlugin({
        analyzerMode: "static"
        ,openAnalyzer: true
      })
    ]
    ,module: {
      rules: [
        {
          test: /\.js$/, //files to apply this loader
          exclude: /node_modules/, //excludes global modules
          use: {
            loader: 'babel-loader', //webpack loader to setup babel
            options: {
              presets: [['@babel/preset-env', {
                "useBuiltIns": "entry"
                ,"corejs": 3
              }], '@babel/preset-react'] //enables ES2015 and react/JSX
              ,plugins: [
                '@babel/plugin-proposal-object-rest-spread'
                ,'@babel/plugin-transform-runtime'
              ]
              ,babelrc: false //disables .babelrc config; using this one only
            }
          }
        }
      ]
    }
  }

  config.entry["core-js/stable", "regenerator-runtime/runtime", name] = `${path.join(APP_DIR, name)}.js`

  return config
}

//if you have multiple apps (like say: public site vs private app),
//  you can call buildConfig multiple times with different subfolders
module.exports = [
  buildConfig({name: "index"})
]
