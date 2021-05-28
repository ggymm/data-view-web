<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :init-options="initOption"
    :option="option"
    :update-options="updateOptions"
    class="chart"
  />
</template>
<script>
import OptionConfigMap from '@/components/DataView/components/config'

export default {
  name: 'LineNormal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    lock: {
      type: String,
      default: 'false'
    },
    option: {
      type: Object,
      default() {
        return OptionConfigMap['LineNormal'].option
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
      initOption: OptionConfigMap['LineNormal'].option
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
      if (this.apiData.source.length <= 1) {
        return
      }

      this.$set(this.option, 'dataset', this.apiData)

      if (this.lock === 'true') {
        return
      }

      const dimension = this.apiData.source[0]
      const series = []
      if (dimension.length === 1) {
        if (this.option.series.length === 0 || this.option.series.length !== dimension.length) {
          series.push({
            type: 'line',
            lineStyle: {}
          })
          this.$set(this.option, 'series', series)
        }
      } else {
        if (dimension.length - 1 !== this.option.series.length) {
          // 如果两次数据个数不一致，应该清空重新设置
          for (let i = 1; i < dimension.length; i++) {
            series.push({
              type: 'line',
              lineStyle: {}
            })
          }
          this.$set(this.option, 'series', series)
        }
      }
    }
  }
}
</script>
