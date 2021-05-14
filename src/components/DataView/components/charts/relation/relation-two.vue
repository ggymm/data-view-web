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
import { getRelationTwoConfig } from '../../config/relation-two-config'

export default {
  name: 'RelationTwo',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRelationTwoConfig().option
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
      chartType: 'relationTwo',
      chart: null,
      initOption: getRelationTwoConfig().option
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
      for (var i = 0; i < this.apiData.categories.length; i++) {
        legendData.push(this.apiData.categories[i].name)
      }
      var nodeData = this.apiData.nodes
      for (var j = 0; j < nodeData.length; j++) {
        nodeData[j].value = nodeData[j].symbolSize
        nodeData[j].symbolSize /= 1.5
        nodeData[j].label = {
          normal: {
            show: nodeData[j].symbolSize > 10
          }
        }
      }
      this.option.legend[0].data = legendData
      this.option.series[0].data = nodeData
      this.option.series[0].links = this.apiData.edges
      this.option.series[0].categories = this.apiData.categories
    }
  }
}
</script>
