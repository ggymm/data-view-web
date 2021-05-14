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
import { getRelationFourConfig } from '../../config/relation-four-config'

export default {
  name: 'RelationFour',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRelationFourConfig().option
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
      chartType: 'relationFour',
      initOption: getRelationFourConfig().option
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
      var seriesData = this.apiData.nodes
      for (var i = 0; i < seriesData.length; i++) {
        seriesData[i].id = i
      }
      this.option.series[0].data = seriesData
      this.option.series[0].links = this.apiData.edges
      this.option.series[0].categories = this.apiData.categories
    }
  }
}
</script>
