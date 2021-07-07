const path = require('path')
// noinspection NpmUsedModulesInstalled
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())

const isCdn = true

function resolve(dir) {
  return path.join(__dirname, dir)
}

const assetsCDN = {
  // webpack build externals
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
  monaco: {
    'loader': '/data-view-web/static/monaco/min/vs/loader.js',
    // 'loader': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/loader.js',
    'vs': '/data-view-web/static/monaco/min/vs'
    // 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs'
  },
  css: [
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.5/dist/antd.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',

    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',

    'https://cdn.jsdelivr.net/npm/@vue/composition-api@1.0.0-rc.8',
    'https://cdn.jsdelivr.net/npm/echarts@5.1.2',
    'https://cdn.jsdelivr.net/npm/vue-echarts@6.0.0-rc.6',

    'https://cdn.jsdelivr.net/npm/moment@2.24.0/min/moment.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.5/dist/antd.min.js'
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
