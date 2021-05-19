<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :init-options="initOption"
    :option="option"
    element-loading-text="Loading..."
    class="chart"
    @click="handleChartClick"
  />
</template>
<script>
import { getLineNormalConfig } from '../../config/line/line-normal-config'

export default {
  name: 'LineNormal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineNormalConfig().option
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
      chartType: 'lineNormal',
      initOption: getLineNormalConfig().option
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
      this.option.dataset = this.apiData
      const legend = this.apiData.source[0]
      const series = []
      if (legend !== null && legend !== undefined && legend.length > 1) {
        for (let i = 1; i < legend.length; i++) {
          series.push({
            type: 'line'
          })
        }
      } else {
        series.push({
          type: 'line'
        })
      }
      this.option.series = series
    }
  }
}
</script>
