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
  name: 'MapChina',
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
      if (this.apiData.source.length <= 0) {
        return
      }

      this.$set(this.option, 'dataset', this.apiData)
    }
  }
}
</script>

<style scoped>

</style>
