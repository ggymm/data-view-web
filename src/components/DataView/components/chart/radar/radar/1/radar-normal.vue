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
    theme: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    data() {
      return this.item.data
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
    this.setData()
  },
  methods: {
    setData() {
      this.item.option.radar.indicator = this.data.indicator
      this.item.option.series[0].data = this.data.data
    }
  }
}
</script>
