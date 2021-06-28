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
  name: 'MapChina',
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
  },
  methods: {
    setData() {
      if (this.data.source.length <= 0) {
        return
      }

      this.$set(this.item.option, 'dataset', this.data)
    }
  }
}
</script>

<style scoped>

</style>
