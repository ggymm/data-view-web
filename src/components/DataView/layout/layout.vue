<template>
  <div :style="screenWrapperStyle()">
    <!-- 标尺 -->
    <ruler />
    <div
      id="data-view-layout"
      ref="layout"
      class="data-view-layout"
      :style="layoutStyle()"
      @contextmenu="handleContextmenu"
      @mousedown="handleMousedown"
    >
      <slot />
      <!-- 对齐线 -->
      <mark-line />
      <!-- 选中区域 -->
      <choose-area v-show="isShowArea" :start="start" :width="width" :height="height" />
    </div>
    <!-- 右键菜单 -->
    <contextmenu :left="position.left" :top="position.top" />
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import { mapState } from 'vuex'
import defaultSettings from '@/config'
import Ruler from './ruler/index'
import MarkLine from './mark-line'
import ChooseArea from './area'
import Contextmenu from './contextmenu'

export default {
  name: 'Layout',
  components: {
    Ruler,
    MarkLine,
    ChooseArea,
    Contextmenu
  },
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl,
      start: {
        x: 0,
        y: 0
      },
      position: {
        top: 0,
        left: 0
      },
      width: 0,
      height: 0,
      isShowArea: false
    }
  },
  computed: mapState([
    'currentItem',
    'canvasConfig',
    'screenConfig'
  ]),
  mounted() {
    const _this = this
    // 复制粘贴功能
    hotkeys('ctrl+c, ctrl+v', function(event, handler) {
      switch (handler.key) {
        case 'ctrl+c':
          _this.$store.commit('itemCopy')
          break
        case 'ctrl+v':
          _this.$store.commit('itemPaste', { mouse: false })
          break
      }
    })
    // 移动功能
    hotkeys('up, down, left, right', function(event, handler) {
      if (!_this.currentItem) return
      switch (handler.key) {
        case 'up':
          _this.currentItem.y -= 1
          break
        case 'down':
          _this.currentItem.y += 1
          break
        case 'left':
          _this.currentItem.x -= 1
          break
        case 'right':
          _this.currentItem.x += 1
          break
      }
    })
  },
  beforeDestroy() {
    hotkeys.unbind('ctrl+c, ctrl+v')
    hotkeys.unbind('up, down, left, right')
  },
  methods: {
    layoutStyle() {
      const style = {
        width: `${this.screenConfig.width}px`,
        height: `${this.screenConfig.height}px`,
        transform: `scale(${this.canvasConfig.scale}) translate(0px, 0px)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
      if (this.screenConfig.backgroundImg.length !== 0) {
        style.backgroundImage = `url(${this.imageBasicUrl}${this.screenConfig.backgroundImg})`
      } else {
        style.background = '#263546'
      }
      return style
    },
    screenWrapperStyle() {
      return {
        width: `${this.canvasConfig.width}px`,
        height: `${this.canvasConfig.height}px`
      }
    },
    handleContextmenu(e) {
      e.stopPropagation()
      e.preventDefault()

      const layout = this.$refs.layout.getBoundingClientRect()

      this.$store.commit('showContextmenu', {
        top: e.clientY - layout.y + 64,
        left: e.clientX - layout.x + 64
      })
    },
    handleMousedown(e) {

    }
  }
}
</script>

