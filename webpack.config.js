const path                    = require('path')
const _                       = require("lodash")
const webpack                 = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin            = require("terser-webpack-plugin")

var BUILD_DIR = path.resolve(__dirname, 'dist/')
var APP_DIR = path.resolve(__dirname, 'src/')


//This is an example of a single entry script build for a react/single-page app. Hence "main"
//For a multi-page site build, you'll want to create entries for each page script instead.
const buildConfig = (options = {}) => {
  let {name, mode} = options
  let devMode = mode !== "production"
  let optimization = {}
  if (!devMode)
    _.assignIn(optimization, {
      minimize: !devMode
      ,minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
    })

  var config = {
    entry: {}
    ,optimization
    ,output: {
      path: BUILD_DIR
      ,publicPath: "/"
      ,filename: "index.bundle.js"
      ,chunkFilename: '[id].[hash].js'
    }
    ,mode
    ,plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
      ,new BundleAnalyzerPlugin({
        analyzerMode: "static"
        ,openAnalyzer: false
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
              babelrc: true //disables .babelrc config; using this one only
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
module.exports = (env, argv) => {
  let mode = argv.mode || "development"
  return buildConfig({name: "index", mode}) //could be array
}
