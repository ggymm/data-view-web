<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :auto-resize="true"
    :init-options="initOption"
    :options="option"
    element-loading-text="Loading..."
    class="chart"
    @click="handleChartClick"
  />
</template>
<script>
import { getLineStackingAreaConfig } from '../../config/line-stacking-area-config'

export default {
  name: 'LineStackingArea',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineStackingAreaConfig().option
      }
    },
    apiData: {
      type: Object,
      default() {
        return {}
      }
    },
    theme: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chartType: 'lineStackingArea',
      initOption: getLineStackingAreaConfig().option
    }
  },
  watch: {
    apiData: function() {
      this.setData()
    }
  },
  async mounted() {
    const chart = this.$refs.chart
    this.$emit('init', {
      chart: chart
    })
  },
  methods: {
    handleChartClick(param) {
    },
    setData() {
      this.option.legend.data = this.apiData.legend
      this.option.xAxis.data = this.apiData.x
      const _data = this.apiData.y
      // 如果series有值，此时更新的应该只是数据
      if (this.option.series.length !== 0) {
        // 需要判断两次数据是否一致
        // 如果不一致，应该以新数据的长度为准
        if (this.option.series.length > _data.length) {
          this.option.series.splice(0, this.option.series.length - _data.length)
        } else if (this.option.series.length < _data.length) {
          for (let i = 0; i < (_data.length - this.option.series.length); i++) {
            this.option.series.push({
              name: '',
              type: 'line',
              data: [],
              areaStyle: {}
            })
          }
        }
        for (let i = 0; i < this.option.series.length; i++) {
          this.option.series[i].name = _data[i].name
          this.option.series[i].data = _data[i].value
        }
      } else {
        this.option.series = []
        for (let i = 0; i < _data.length; i++) {
          this.option.series.push({
            name: _data[i].name,
            type: 'line',
            data: _data[i].value,
            areaStyle: {}
          })
        }
      }
    }
  }
}
</script>
