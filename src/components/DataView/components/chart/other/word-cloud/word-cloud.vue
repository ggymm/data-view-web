<template>
  <echarts
    ref="chart"
    :theme="theme"
    :autoresize="true"
    :option="item.option"
    class="chart"
  />
</template>
<script>
export default {
  name: 'WordCloud',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    },
    apiData: {
      type: Array,
      default() {
        return []
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
      this.item.option.series[0].data = this.apiData
    }
  }
}
</script>
