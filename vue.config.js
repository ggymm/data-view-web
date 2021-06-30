const path = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())

function resolve(dir) {
  return path.join(__dirname, dir)
}

const vueConfig = {
  publicPath: '/data-view-web',
  outputDir: 'build',
  devServer: {
    port: 8000
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2491f7',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new HardSourceWebpackPlugin(),
      new MonacoWebpackPlugin(),
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
  }
}

// noinspection JSPrimitiveTypeWrapperUsage
module.exports = vueConfig
