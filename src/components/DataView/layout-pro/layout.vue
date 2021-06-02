<template>
  <div
    class="data-view-layout"
    :style="{
      width: panelWidth + 'px',
      height: panelHeight + 'px',
      transform: `scale(${scale / 100}) translate(0px, 0px)`,
      backgroundImage: backgroundImg,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    }"
  >
    <slot />
    <!-- 选中区域 -->
    <choose-area v-show="isShowArea" :start="start" :width="width" :height="height" />
  </div>
</template>

<script>
import ChooseArea from './area'

export default {
  name: 'Layout',
  components: {
    ChooseArea
  },
  props: {
    scale: {
      type: Number,
      default: 100
    },
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
      start: {
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
