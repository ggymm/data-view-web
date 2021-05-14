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
import { getRelationOneConfig } from '../../config/relation/relation-one-config'

export default {
  name: 'RelationOne',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRelationOneConfig().option
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
      chartType: 'relationOne',
      initOption: getRelationOneConfig().option
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
