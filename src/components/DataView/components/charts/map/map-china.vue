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
import { getMapChinaConfig } from '../../config/map/map-china-config'

export default {
  name: 'MapChina',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getMapChinaConfig().option
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
      chartType: 'mapChina',
      initOption: getMapChinaConfig().option
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
      const _data = this.apiData.data
      this.option.series = []
      for (let i = 0; i < _data.length; i++) {
        const item = {
          name: _data[i].name,
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#ffffff'
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#ffffff'
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'transparent',
              areaColor: '#080B19',
              borderColor: '#00C8DC'
            },
            emphasis: {
              areaColor: '#1B2D4D'
            }
          },
          data: _data[i].value
        }
        this.option.series.push(item)
      }
    }
  }
}
</script>

<style scoped>

</style>
