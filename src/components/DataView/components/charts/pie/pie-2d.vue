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
import { getPie2DConfig } from '../../config/pie/pie-2d-config'

export default {
  name: 'Pie2D',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPie2DConfig().option
      }
    },
    apiData: {
      type: Array,
      default() {
        return []
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
      chartType: 'pie2D',
      initOption: getPie2DConfig().option
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
      var legendData = []
      for (var i = 0; i < this.apiData.length; i++) {
        legendData.push(this.apiData[i].name)
      }
      this.option.legend.data = legendData
      this.option.series[0].data = this.apiData
    }
  }
}
</script>
