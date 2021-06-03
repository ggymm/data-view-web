<template>
  <div
    class="data-view-layout"
    :style="{
      width: panelWidth + 'px',
      height: panelHeight + 'px',
      transform: `scale(${scale / 100}) translate(0px, 0px)`,
      backgroundImage: 'url(' + imageBasicUrl + backgroundImg + ')',
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
import defaultSettings from '@/config'
import ChooseArea from './area'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
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
    'scale',
    'panelWidth',
    'panelHeight',
    'backgroundImg'
  ]),
  methods: {}
}
</script>

<style scoped>

</style>
