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
  async mounted() {
    const chart = this.$refs.chart
    this.$emit('init', {
      chart: chart
    })
  }
}
</script>
