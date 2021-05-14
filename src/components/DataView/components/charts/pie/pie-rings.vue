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
import { getPieRingsConfig } from '../../config/pie/pie-rings-config'

export default {
  name: 'PieRings',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPieRingsConfig().option
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
      chartType: 'pieRings',
      initOption: getPieRingsConfig().option
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
      var radius1 = ''
      var radius2 = ''
      if (this.option.series.length !== 0) {
        radius1 = this.option.series[0].radius[0]
        radius2 = this.option.series[0].radius[1]
      } else {
        radius1 = 40
        radius2 = 55
      }
      var datas = this.apiData
      for (var i = 0; i < datas.length; i++) {
        var n0 = Math.round(datas.length / 2)
        var centerx = 0
        var centery = '0'
        if (i > ((datas.length - 1) / 2)) {
          centerx = 5 + (i - n0) * (100 - 10) / n0 + ((100 - 10) / n0) / 2
          centery = '70%'
        } else {
          centerx = 5 + i * (100 - 10) / n0 + ((100 - 10) / n0) / 2
          centery = '30%'
        }
        var center = []
        center.push(centerx + '%')
        center.push(centery)
        var radius = []
        if (radius1 && radius2) {
          radius[0] = radius1
          radius[1] = radius2
        } else {
          radius[0] = 40
          radius[1] = 55
        }
        var seriesData = {
          type: 'pie',
          center: center,
          radius: radius,
          itemStyle: {
            normal: {
              label: { formatter: function(params) { return 100 - params.value + '%' }, textStyle: { baseline: 'top' }}
            }
          },
          data: [
            {
              name: 'other',
              value: datas[i].other,
              itemStyle: {
                normal: {
                  color: '#ccc',
                  label: { show: true, position: 'center' },
                  labelLine: { show: false }
                },
                emphasis: { color: 'rgba(0,0,0,0)' }
              }
            },
            {
              name: datas[i].name,
              value: datas[i].value,
              itemStyle: {
                normal: {
                  label: { show: true, position: 'center', formatter: '{b}', textStyle: { baseline: 'bottom' }},
                  labelLine: { show: false }
                }
              }
            }
          ]
        }
        this.option.series.push(seriesData)
      }
    }
  }
}
</script>
