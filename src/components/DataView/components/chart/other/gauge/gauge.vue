<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :option="option"
    class="chart"
    @click="handleChartClick"
  />
</template>
<script>
export default {
  name: 'Gauge',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    apiData: {
      type: Array,
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
    handleChartClick(param) {
    },
    setData() {
      var seriesData = []
      seriesData = this.apiData[0]
      this.option.series.data.push(seriesData)
    }
  }
}
</script>
