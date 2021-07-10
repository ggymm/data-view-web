const path = require('path')
// noinspection NpmUsedModulesInstalled
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())

// 如果没有网络，改为false
const isCdn = true

function resolve(dir) {
  return path.join(__dirname, dir)
}

const assetsCDN = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',

    '@vue/composition-api': 'VueCompositionAPI',
    'echarts': 'echarts',
    'vue-echarts': 'VueECharts',

    'moment': 'moment',
    'ant-design-vue': 'antd'
  },
  css: [
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.5/dist/antd.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@latest/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@latest/dist/vuex.min.js',

    'https://cdn.jsdelivr.net/npm/axios@latest/dist/axios.min.js',

    'https://cdn.jsdelivr.net/npm/@vue/composition-api@1.0.0-rc.8',
    'https://cdn.jsdelivr.net/npm/echarts@latest',
    'https://cdn.jsdelivr.net/npm/vue-echarts@latest',

    'https://cdn.jsdelivr.net/npm/moment@2.24.0/min/moment.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.6/dist/antd.min.js'
  ]
}

// noinspection JSUnusedGlobalSymbols
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
          'primary-color': '#8ab4f8',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
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
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // if prod, add externals
    externals: isCdn ? assetsCDN.externals : {}
  },
  chainWebpack: (config) => {
    // if prod is on
    // assets require on cdn
    if (isCdn) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  }
}

// noinspection JSPrimitiveTypeWrapperUsage
module.exports = vueConfig
