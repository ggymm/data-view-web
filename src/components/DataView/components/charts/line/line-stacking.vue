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
import { getLineStackingConfig } from '../../config/line/line-stacking-config'

export default {
  name: 'LineStacking',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineStackingConfig().option
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
      chartType: 'lineStacking',
      initOption: getLineStackingConfig().option
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
      this.option.dataset.source = this.apiData
      if (this.option.series.length === 0) {
        this.option.series = []
        for (let i = 0; i < this.apiData[0].length - 1; i++) {
          this.option.series.push({
            'type': 'line'
          })
        }
      }
    }
  }
}
</script>
