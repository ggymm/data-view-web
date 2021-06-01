<template>
  <div
    class="data-view-layout"
    :style="{
      width: panelWidth + 'px',
      height: panelHeight + 'px',
      backgroundImage: backgroundImg,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%'
    }"
  >
    <slot />
    <!-- 网格线 -->
    <grid />
    <!-- 选中区域 -->
    <choose-area v-show="isShowArea" :start="start" :width="width" :height="height" />
  </div>
</template>

<script>
import Grid from './grid'
import ChooseArea from './area'

export default {
  name: 'Layout',
  components: {
    Grid,
    ChooseArea
  },
  props: {
    panelWidth: {
      type: Number,
      default: 0
    },
    panelHeight: {
      type: Number,
      default: 0
    },
    backgroundImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorX: 0,
      editorY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0
      },
      width: 0,
      height: 0,
      isShowArea: false
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
