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
import OptionConfigMap from '@/components/DataView/components/config'

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
        return OptionConfigMap['PieNormal'].option
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
      initOption: OptionConfigMap[''].option
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
      if (this.apiData.source.length <= 0) {
        return
      }

      this.$set(this.option, 'dataset', this.apiData)
      const series = []
      series.push({
        type: 'pie'
      })
      this.$set(this.option, 'series', series)
    }
  }
}
</script>
