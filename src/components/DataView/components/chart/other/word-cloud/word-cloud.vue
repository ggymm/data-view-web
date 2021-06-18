<template>
  <echarts
    ref="chart"
    :loading="loading"
    :theme="theme"
    :autoresize="true"
    :option="option"
    class="chart"
  />
</template>
<script>
export default {
  name: 'WordCloud',
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
      this.option.series[0].data = this.apiData
    }
  }
}
</script>
