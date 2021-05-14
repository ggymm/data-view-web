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
import { getPiePercentConfig } from '../../config/pie-percent-config'

export default {
  name: 'PiePercent',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPiePercentConfig().option
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
      chartType: 'piePercent',
      initOption: getPiePercentConfig().option
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
      this.option.title.text = this.apiData.value + '%'
      this.option.series[0].data[0].value = parseInt(this.apiData.value)
      this.option.series[0].data[1].value = 100 - parseInt(this.apiData.value)
    }
  }
}
</script>
