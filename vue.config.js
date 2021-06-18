const path = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())

function resolve(dir) {
  return path.join(__dirname, dir)
}

const vueConfig = {
  publicPath: '/data-view-web',
  configureWebpack: {
    plugins: [
      new HardSourceWebpackPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 8000
  },

  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: []
}

// noinspection JSPrimitiveTypeWrapperUsage
module.exports = vueConfig
