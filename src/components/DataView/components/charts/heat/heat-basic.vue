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
import { getHeatBasicConfig } from '../../config/heat/heat-basic-config'
import BMap from 'echarts/extension/bmap/bmap'

export default {
  name: 'HeatBasic',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHeatBasicConfig().option
      }
    },
    apiData: {
      type: Array,
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
      chartType: 'heatBasic',
      chart: null,
      initOption: getHeatBasicConfig().option
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
    var bmap = chart.getModel().getComponent('bmap').getBMap()
    bmap.addControl(new BMap.MapTypeControl())
  },
  methods: {
    handleChartClick(param) {
    },
    setData() {
      this.option.series.data = this.apiData
    }
  }
}
</script>
