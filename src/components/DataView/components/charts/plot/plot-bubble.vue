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
import { getPlotBubbleConfig } from '../../config/plot-bubble-config'

export default {
  name: 'PlotBubble',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPlotBubbleConfig().option
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
      chartType: 'plotBubble',
      initOption: getPlotBubbleConfig().option
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
      const itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
      const _data = this.apiData.data
      this.option.series = []
      for (let i = 0; i < _data.length; i++) {
        const series = {
          name: _data[i].name,
          type: 'scatter',
          symbolSize: function(data) {
            return Math.sqrt(data[2]) / 5e2
          },
          itemStyle: itemStyle,
          data: _data[i].value,
          emphasis: {
            label: {
              show: true,
              formatter: function(param) {
                return param.data[3]
              },
              position: 'top'
            }
          }
        }
        this.option.series.push(series)
      }
      console.log(this.option.series)
    }
  }
}
</script>
