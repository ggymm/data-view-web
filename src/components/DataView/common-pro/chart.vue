<template>
  <div class="data-view-chart">
    <component
      :is="item.chartType"
      :loading="loading"
      :lock="item.lock"
      :api-data="chartData"
      :option="item.option"
      :update-options="updateOptions"
      :el-id="item.elId"
      :theme="ThemeConfigMap[theme]"
      @init="chartInit"
    />
  </div>
</template>
<!--suppress JSUnresolvedVariable -->
<script>
import '../components/index'
import ThemeConfigMap from '@/components/DataView/themes/theme-config-map'
import { getChartData } from '@/api/data-view'

export default {
  name: 'Chart',
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
    const instanceId = this.$route.params.instance_id
    if (instanceId) {
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
      const config = this.item.chartData
      if (!this.checkData(this.lastChartData, config)) {
        if (config.dataSourceType === 'DataBase' && config.database !== '') {
          delete config.fileName
          if (this.checkDataKey(config)) {
            config.chartType = this.item.chartType
            getChartData(config).then(response => {
              this.chartData = response.data
              this.loading = false
            })
          }
        } else if (config.dataSourceType === 'CSV' && config.fileName !== '') {
          console.log('')
        }
        this.lastChartData = JSON.parse(JSON.stringify(config))
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

