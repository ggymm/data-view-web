<template>
  <a-progress
    :loading="loading"
    :text-inside="true"
    :show-text="option.showText"
    :stroke-width="option.strokeWidth"
    :color="option.barColor"
    :percentage="percentage"
    class="chart"
  />
</template>

<script>
import OptionConfigMap from '@/components/DataView/components/config'

export default {
  name: 'Progress',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return OptionConfigMap['Progress'].option
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
      percentage: 0
    }
  },
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.percentage = this.apiData.data
      }
    }
  }
}
</script>

<style scoped>

</style>
