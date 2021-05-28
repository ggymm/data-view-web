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
import { getProgressBarConfig } from '../../config/other/progress-config'

export default {
  name: 'ProgressBar',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getProgressBarConfig().option
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
      chartType: 'progressBar',
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
