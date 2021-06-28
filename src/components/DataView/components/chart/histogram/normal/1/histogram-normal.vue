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
  name: 'HistogramNormal',
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
      if (this.data.source.length <= 1) {
        return
      }

      this.$set(this.item.option, 'dataset', this.data)

      if (this.item.lock === 'true') {
        return
      }

      const dimension = this.data.source[0]
      const series = []
      if (dimension.length === 1) {
        if (this.item.option.series.length === 0 || this.item.option.series.length !== dimension.length) {
          series.push({
            type: 'bar',
            itemStyle: {
              borderRadius: [0, 0, 0, 0]
            }
          })
          this.$set(this.item.option, 'series', series)
        }
      } else {
        if (dimension.length - 1 !== this.item.option.series.length) {
          // 如果两次数据个数不一致，应该清空重新设置
          for (let i = 1; i < dimension.length; i++) {
            series.push({
              type: 'bar',
              itemStyle: {
                borderRadius: [0, 0, 0, 0]
              }
            })
          }
          this.$set(this.item.option, 'series', series)
        }
      }
    }
  }
}
</script>
