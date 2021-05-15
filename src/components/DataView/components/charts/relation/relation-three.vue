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
import { getRelationThreeConfig } from '../../config/relation/relation-three-config'

export default {
  name: 'RelationThree',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRelationThreeConfig().option
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
      chartType: 'relationThree',
      initOption: getRelationThreeConfig().option
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
      var nodeDataResult = []
      for (var i = 0; i < this.apiData.nodes.length; i++) {
        var nodeData = {}
        nodeData.x = this.apiData.nodes[i].x
        nodeData.y = this.apiData.nodes[i].y
        nodeData.id = this.apiData.nodes[i].id
        nodeData.name = this.apiData.nodes[i].label
        nodeData.symbolSize = this.apiData.nodes[i].size
        var itemStyle = { normal: { color: this.apiData.nodes[i].color }}
        nodeData.itemStyle = itemStyle
        nodeDataResult.push(nodeData)
      }
      var edgeDataResult = []
      for (var j = 0; j < this.apiData.edges.length; j++) {
        var edgeData = {}
        edgeData.source = this.apiData.edges[j].sourceID
        edgeData.target = this.apiData.edges[j].targetID
        edgeDataResult.push(edgeData)
      }
      this.option.series[0].data = nodeDataResult
      this.option.series[0].edges = edgeDataResult
      this.option.series[0].categories = this.apiData.categories
    }
  }
}
</script>
