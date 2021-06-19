<template>
  <echarts
    ref="chart"
    :theme="theme"
    :autoresize="true"
    :option="item.option"
    :update-options="updateOptions"
    class="chart"
  />
</template>
<script>
export default {
  name: 'RadarNormal',
  props: {
    item: {
      require: true,
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
      this.item.option.radar.indicator = this.apiData.indicator
      this.item.option.series[0].data = this.apiData.data
    }
  }
}
</script>
