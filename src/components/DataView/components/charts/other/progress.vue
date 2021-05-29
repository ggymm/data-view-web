<template>
  <div class="chart">
    <a-spin :spinning="loading" tip="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <a-progress
        :type="option.type"
        :percent="percent"
        :show-info="option.showInfo"
        :stroke-linecap="option.strokeLinecap"
        :stroke-width="option.strokeWidth"
        :stroke-color="option.strokeColor"
        :width="option.width"
        :gap-degree="option.gapDegree"
        :gap-position="option.gapPosition"
        class="chart"
      >
        <template #format="info">
          <span
            :style="{
              fontSize: option.info.fontSize + 'px',
              color: option.info.color
            }"
          >
            {{ info }}</span>
        </template>
      </a-progress>
    </a-spin>
  </div>
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
      percent: 0
    }
  },
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.percent = parseInt(this.apiData.value)
      }
    }
  }
}
</script>

<style scoped>

</style>
