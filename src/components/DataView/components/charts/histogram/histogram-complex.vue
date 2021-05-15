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
import { getHistogramComplexConfig } from '../../config/histogram/histogram-complex-config'

export default {
  name: 'HistogramComplex',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHistogramComplexConfig().option
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
      chartType: 'histogramComplex',
      initOption: getHistogramComplexConfig().option
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
      const _data = this.apiData.value
      for (let i = 0; i < _data.length; i++) {
        this.option.xAxis[i].data = _data[i].x
        this.option.series[i].data = _data[i].y
      }
    }
  }
}
</script>
