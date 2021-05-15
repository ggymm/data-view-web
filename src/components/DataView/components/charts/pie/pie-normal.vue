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
import { getPieNormalConfig } from '../../config/pie/pie-normal-config'

export default {
  name: 'PieNormal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPieNormalConfig().option
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
      chartType: 'pieNormal',
      initOption: getPieNormalConfig().option
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
      const legendData = []
      for (let i = 0; i < this.apiData.length; i++) {
        legendData.push(this.apiData[i].name)
      }
      this.option.legend.data = legendData
      this.option.series[0].data = this.apiData
    }
  }
}
</script>
