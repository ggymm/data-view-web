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
import { getRelationFiveConfig } from '../../config/relation-five-config'

export default {
  name: 'RelationFive',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRelationFiveConfig().option
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
      chartType: 'relationFive',
      initOption: getRelationFiveConfig().option
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
      this.option.legend[0].data = legendData
      this.option.series[0].data = this.apiData.nodes
      this.option.series[0].links = this.apiData.edges
      this.option.series[0].categories = this.apiData.categories
    }
  }
}
</script>
