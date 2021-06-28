<template>
  <echarts
    ref="chart"
    :theme="theme"
    :autoresize="true"
    :option="item.option"
    class="chart"
    @click="handleChartClick"
  />
</template>
<script>
export default {
  name: 'Gauge',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    },
    data: {
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
    data: function() {
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
      seriesData = this.data[0]
      this.item.option.series.data.push(seriesData)
    }
  }
}
</script>
