<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :option="option"
    :update-options="updateOptions"
    class="chart"
  />
</template>
<script>
export default {
  name: 'RadarNormal',
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
        return {}
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
      this.option.radar.indicator = this.apiData.indicator
      this.option.series[0].data = this.apiData.data
    }
  }
}
</script>
