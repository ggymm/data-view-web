<template>
  <div class="chart">
    <img
      v-if="item.option.url"
      alt="图片组件"
      width="100%"
      height="100%"
      :src="`${imageBasicUrl}${item.option.url}`"
      :style="itemStyle()"
    >
    <icon v-else type="icon-ImageChartNew" :style="defaultImageStyle()" />
  </div>
</template>

<script>
import defaultSettings from '@/config'

export default {
  name: 'ImageChart',
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
      imageBasicUrl: defaultSettings.imageBasicUrl
    }
  },
  methods: {
    itemStyle() {
      const { option } = this.item
      return {
        borderStyle: 'none',
        transform: `
          rotateX(${option.rotateX}deg)
          rotateY(${option.rotateY}deg)
          scaleX(${option.scaleX})
          scaleY(${option.scaleY})
          translate(${option.translateX}px, ${option.translateY}px)`
      }
    },
    defaultImageStyle() {
      return {
        width: `${this.item.width}px`,
        height: `${this.item.height}px`,
        fontSize: '36px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  }
}
</script>
