<template>
  <div v-if="current" class="early-warning" :style="itemStyle()">
    <div :style="symbolStyle()">
      {{ current.symbol }}
    </div>
    <div :style="borderStyle()" />
    <div v-if="current.alert" class="alert-wave" :style="warningStyle()" />
  </div>
</template>

<script>
export default {
  name: 'EarlyWarning',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      current: null
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
    this.setData()
  },
  methods: {
    itemStyle() {
      return {
        top: `${(this.item.height - this.item.option.boundary) / 2}px`,
        left: `${(this.item.width - this.item.option.boundary) / 2}px`
      }
    },
    symbolStyle() {
      return {
        borderRadius: '50%',
        width: `${this.item.option.radius}px`,
        height: `${this.item.option.radius}px`,
        lineHeight: `${this.item.option.radius}px`,
        transform: `translate3d(${this.item.option.radius / 2}px, ${this.item.option.radius / 2}px, 0px)`,
        color: this.current.codeColor,
        fontSize: `${this.item.option.symbolSize}px`,
        textAlign: 'center'
      }
    },
    borderStyle() {
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${this.item.option.boundary}px`,
        height: `${this.item.option.boundary}px`,
        border: `3px solid ${this.current.codeColor}`,
        borderRadius: '50%'
      }
    },
    warningStyle() {
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${this.item.option.boundary}px`,
        height: `${this.item.option.boundary}px`,
        border: `${this.item.option.spread}px solid ${this.current.codeColor}`,
        borderRadius: '50%'
      }
    },
    setData() {
      for (let i = 0; i < this.item.option.series.length; i++) {
        const series = this.item.option.series[i]
        if (series.code === this.item.data.value) {
          this.current = series
        }
      }
    }
  }
}
</script>
<style>
.early-warning {
  position: absolute;
}
</style>

