const path = require('path')
const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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
          'primary-color': '#409eff',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }),
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
