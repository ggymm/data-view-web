<template>
  <div class="chart">
    <a-spin :spinning="loading" tip="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <a-progress
        :type="item.option.type"
        :percent="percent"
        :show-info="item.option.showInfo"
        :stroke-linecap="item.option.strokeLinecap"
        :stroke-width="item.option.strokeWidth"
        :stroke-color="item.option.strokeColor"
        :width="item.option.width"
        :gap-degree="item.option.gapDegree"
        :gap-position="item.option.gapPosition"
        class="chart"
      >
        <template #format="info">
          <span
            :style="{
              fontSize: item.option.info.fontSize + 'px',
              color: item.option.info.color
            }"
          >
            {{ info }}</span>
        </template>
      </a-progress>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    item: {
      require: true,
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
