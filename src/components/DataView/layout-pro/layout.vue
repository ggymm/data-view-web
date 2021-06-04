<template>
  <!--suppress JSUnresolvedVariable -->
  <div
    class="data-view-layout"
    :style="{
      width: `${screenStyle.width}px`,
      height: `${screenStyle.height}px`,
      transform: `scale(${canvasStyle.scale}) translate(0px, 0px)`,
      backgroundImage: `url(${imageBasicUrl}${screenStyle.backgroundImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    }"
  >
    <slot />
    <!-- 对齐线 -->
    <mark-line />
    <!-- 选中区域 -->
    <choose-area v-show="isShowArea" :start="start" :width="width" :height="height" />
  </div>
</template>

<script>
import defaultSettings from '@/config'
import ChooseArea from './area'
import MarkLine from './mark-line'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    ChooseArea,
    MarkLine
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
  methods: {}
}
</script>

<style scoped>

</style>
