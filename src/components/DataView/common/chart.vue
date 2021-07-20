<template>
  <div class="data-view-chart">
    <component
      :is="item.chartType + '_' + item.chartVersion"
      :item="item"
      :update-options="updateOptions"
      :theme="ThemeConfigMap[theme]"
      @init="chartInit"
    />
  </div>
</template>
<!--suppress JSUnresolvedVariable -->
<script>
import '../components/index'
import axios from 'axios'
import { mapState } from 'vuex'
import { EventBus } from '@/utils/event-bus'
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
      updateOptions: {
        notMerge: true,
        lazyUpdate: false
      },
      chart: null,
      timer: null,
      changeTimer: null,
      ThemeConfigMap
    }
  },
  computed: {
    refresh() {
      return this.item.refresh
    },
    ...mapState([
      'currentItem'
    ])
  },
  watch: {
    refresh: function(newVal) {
      if (newVal === 'true') {
        if (this.timer === null) {
          this.setTimer(this.item.interval)
        }
      } else if (newVal === 'false') {
        if (this.timer !== null) {
          clearInterval(this.timer)
          this.timer = null
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
      if (this.item.chartData.dataSourceType === 'Static') {
        this.handleStaticData()
      } else if (this.item.chartData.dataSourceType === 'DataBase') {
        this.handleDataBaseData()
      } else if (this.item.chartData.dataSourceType === 'Rest') {
        this.handleRestData()
      } else if (this.item.chartData.dataSourceType === 'File') {
        this.handleFileData()
      }
    }
    EventBus.$on('handleStaticData', this.handleStaticData)
    EventBus.$on('handleDataBaseData', this.handleDataBaseData)
    EventBus.$on('handleRestData', this.handleRestData)
    EventBus.$on('handleFileData', this.handleFileData)
  },
  methods: {
    setTimer: function(interval) {
      this.timer = setInterval(() => {
      }, interval)
    },
    setChangeTimer: function() {
      let index = 0
      this.changeTimer = setInterval(() => {
        this.changeHighLightItem(index)
        index++
      }, 2000)
    },
    handleStaticData() {
      if (this.item !== this.currentItem) {
        return
      }
      let staticData
      try {
        staticData = JSON.parse(this.item.chartData.staticData)
      } catch (e) {
        return
      }
      if (Object.keys(staticData).length > 0) {
        this.item.data = JSON.parse(JSON.stringify(staticData))
      }
    },
    handleDataBaseData() {
      if (this.item !== this.currentItem) {
        return
      }
      const config = this.item.chartData
      config.chartType = this.item.chartType
      getChartData(config).then(response => {
        this.item.data = response.data
      })
    },
    handleRestData() {
      if (this.item !== this.currentItem) {
        return
      }
      const url = this.item.chartData.restUrl
      if (!url) return
      const headers = this.item.chartData.restHeader || {}
      const body = this.item.chartData.restBody || {}
      if (headers) {
        headers['Content-Type'] = 'application/json'
      }
      if (body) {
        body['dataSourceType'] = 'Rest'
        body['chartType'] = this.item.chartType
      }
      if (this.item.chartData.restType === 'POST') {
        axios({
          url: url,
          headers: headers,
          method: 'post',
          data: body
        }).then(response => {
          if (response.status === 200) {
            this.item.data = response.data.data
          }
        })
      } else {
        axios({
          url: url,
          headers: headers,
          method: 'get'
        }).then(response => {
          if (response.status === 200) {
            this.item.data = response.data.data
          }
        })
      }
    },
    handleFileData() {
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
    }
  }
}
</script>

