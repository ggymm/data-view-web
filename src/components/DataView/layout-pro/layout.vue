<template>
  <div :style="screenWrapperStyle()">
    <!-- 标尺 -->
    <ruler />
    <div
      id="data-view-layout"
      class="data-view-layout"
      :style="layoutStyle()"
    >
      <slot />
      <!-- 对齐线 -->
      <mark-line />
      <!-- 选中区域 -->
      <choose-area v-show="isShowArea" :start="start" :width="width" :height="height" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import defaultSettings from '@/config'
import Ruler from './ruler/index'
import MarkLine from './mark-line'
import ChooseArea from './area'

export default {
  name: 'Layout',
  components: {
    Ruler,
    MarkLine,
    ChooseArea
  },
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl,
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
  computed: mapState([
    'canvasStyle',
    'screenStyle'
  ]),
  methods: {
    layoutStyle() {
      let style = {
        width: `${this.screenStyle.width}px`,
        height: `${this.screenStyle.height}px`,
        transform: `scale(${this.canvasStyle.scale}) translate(0px, 0px)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
      if (this.screenStyle.backgroundImg.length !== 0) {
        style = { ...style,
          ...{
            backgroundImage: `url(${this.imageBasicUrl}${this.screenStyle.backgroundImg})`
          }
        }
      }
      return style
    },
    screenWrapperStyle() {
      return {
        width: `${this.canvasStyle.width}px`,
        height: `${this.canvasStyle.height}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
