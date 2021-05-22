<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :init-options="initOption"
    :option="option"
    :update-options="updateOptions"
    element-loading-text="加载中"
    class="chart"
  />
</template>
<script>
import { getPieNormalConfig } from '../../config/pie/pie-normal-config'

export default {
  name: 'PieNormal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPieNormalConfig().option
      }
    },
    updateOptions: {
      type: Object,
      default() {
        return {}
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
      chartType: 'pieNormal',
      initOption: getPieNormalConfig().option
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
    setData() {
      const defaultSeries = {
        type: 'pie'
      }

      // 判断是否有数据
      if (this.apiData.source.length <= 1) {
        return
      }

      this.$set(this.option, 'dataset', this.apiData)
      const legend = this.apiData.source[0]

      const series = []
      if (legend.length === 1) {
        if (this.option.series.length === 0 || this.option.series.length !== legend.length) {
          series.push(defaultSeries)
          this.$set(this.option, 'series', series)
        }
      } else {
        if (legend.length - 1 !== this.option.series.length) {
          // 如果两次数据个数不一致，应该清空重新设置
          for (let i = 1; i < legend.length; i++) {
            series.push(defaultSeries)
          }
          this.$set(this.option, 'series', series)
        }
      }
    }
  }
}
</script>
