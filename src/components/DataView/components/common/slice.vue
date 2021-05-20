<template>
  <div
    ref="container"
    v-clickOutside="handleItemUnChoose"
    :class="{'choose': item.choose === 'true',
             'adaptation': item.chartType === 'progressBar',
             'slice-wrapper': item.chartType !== 'progressBar'}"
    @click="handleItemChoose"
  >
    <component
      :is="ChartComponentMap[item.chartType]"
      :loading="loading"
      :api-data="chartData"
      :option="item.option"
      :update-options="updateOptions"
      :i="item.i"
      :theme="ThemeConfigMap[theme]"
      @init="chartInit"
    />
  </div>
</template>
<script>

import {
  PlotBubble,
  PlotMap,

  LineNormal,

  HistogramGradient,
  HistogramGradientHorizontal,
  HistogramStacking,
  HistogramComplex,

  MapChina,

  PieNormal,
  PieRing,
  PieRings,
  Pie2D,
  PiePercent,

  RadarBasic,

  HeatBasic,

  RelationOne,
  RelationTwo,
  RelationThree,
  RelationFour,
  RelationFive,

  WordCloud,
  RotationList,
  Counter,
  TitleText,
  ProgressBar,
  PictureV,
  Gauge
} from '../charts'
import ThemeConfigMap from '../../config/theme-config-map'
import ChartComponentMap from '../../config/chart-component-map'
import { getChartData } from '@/api/dataView'

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
const clickOutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

export default {
  name: 'Slice',
  components: {
    PlotBubble,
    PlotMap,

    LineNormal,

    HistogramGradient,
    HistogramGradientHorizontal,
    HistogramStacking,
    HistogramComplex,

    MapChina,

    PieNormal,
    PieRing,
    PieRings,
    Pie2D,
    PiePercent,

    RadarBasic,

    HeatBasic,

    RelationOne,
    RelationTwo,
    RelationThree,
    RelationFour,
    RelationFive,

    WordCloud,
    RotationList,
    Counter,
    TitleText,
    ProgressBar,
    PictureV,
    Gauge
  },
  directives: { clickOutside },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    theme: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      loading: true,
      updateOptions: {
        notMerge: true,
        lazyUpdate: false
      },
      chart: null,
      chartData: null,
      lastChartData: {},
      timer: null,
      changeTimer: null,
      ChartComponentMap,
      ThemeConfigMap
    }
  },
  watch: {
    item: {
      deep: true,
      handler(item) {
        // 取数据模块
        this.getChartData()
        // 刷新数据模块
        if (item.refresh === 'true') {
          if (this.timer === null) {
            this.setTimer(item.interval)
          }
        } else if (item.refresh === 'false') {
          if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
          }
        }
        // 轮播模块
        if (item.broadcast === 'true') {
          if (this.changeTimer === null) {
            this.setChangeTimer()
          }
        } else if (item.broadcast === 'false') {
          if (this.changeTimer !== null) {
            clearInterval(this.changeTimer)
            this.changeTimer = null
          }
        }
      }
    }
  },
  destroyed() {
    if (this.timer !== null) {
      clearInterval(this.timer)
    }
    if (this.changeTimer !== null) {
      clearInterval(this.changeTimer)
    }
  },
  mounted() {
    const instanceId = this.$route.params.instanceId
    if (instanceId) {
      // 如果为编辑获取一次数据
      this.getChartData()
    }
  },
  methods: {
    setTimer: function(interval) {
      this.timer = setInterval(() => {
        this.getChartData()
      }, interval)
    },
    setChangeTimer: function() {
      let index = 0
      this.changeTimer = setInterval(() => {
        this.changeHighLightItem(index)
        index++
      }, 2000)
    },

    getChartData() {
      const _chartDataConfig = this.item.chartData
      if (!this.checkData(this.lastChartData, _chartDataConfig)) {
        if (_chartDataConfig.dataSourceType === 'DataBase' &&
          _chartDataConfig.database !== '') {
          // 数据库需要检查每一个值是否编写正确
          delete _chartDataConfig.fileName
          if (this.checkDataKey(_chartDataConfig)) {
            _chartDataConfig.chartType = this.item.chartType
            getChartData(_chartDataConfig).then(response => {
              this.chartData = response.data
              this.loading = false
            })
          }
        } else if (_chartDataConfig.dataSourceType === 'CSV' &&
          _chartDataConfig.fileName !== '') {
          // console.log('')
        }
        this.lastChartData = JSON.parse(JSON.stringify(_chartDataConfig))
      }
    },
    /**
     * 轮播ECharts组件
     * @param index 用来计算当前Index
     */
    changeHighLightItem(index) {
      const length = this.item.option.series[0].data.length
      if (this.chart !== null) {
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: (index) % length
        })
      }
    },
    chartInit({ chart }) {
      this.chart = chart
    },
    handleItemChoose() {
      this.item.choose = 'true'
      this.$emit('transferHandleItemChoose', this.item)
    },
    handleItemUnChoose() {
      // 此处只是不显示外边框，但是右侧的Options还应该在
      this.item.choose = 'false'
    },
    checkData(lastObject, newObject) {
      const lastObjectKeys = Object.keys(lastObject)
      const newObjectKeys = Object.keys(newObject)
      if (lastObjectKeys.length === newObjectKeys.length) {
        for (let i = 0; i < lastObjectKeys.length; i++) {
          if (lastObject[lastObjectKeys[i]] !== newObject[lastObjectKeys[i]]) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    },
    checkDataKey(object) {
      const objectKeys = Object.keys(object)
      for (let i = 0; i < objectKeys.length; i++) {
        if (object[objectKeys[i]] === undefined ||
          object[objectKeys[i]] === null ||
          object[objectKeys[i]] === '') {
          return false
        }
        if (objectKeys[i] === 'sql') {
          if (object[objectKeys[i]].length <= 0) {
            console.log('sql校验失败!')
            return false
          }
        }
      }
      return true
    }
  }
}
</script>

