<template>
  <div
    :style="screenWrapperStyle()"
    @mousedown="handleMousedown"
  >
    <!-- 标尺 -->
    <ruler />
    <div
      id="data-view-layout"
      ref="layout"
      class="data-view-layout"
      :style="layoutStyle()"
      @contextmenu="handleContextmenu"
    >
      <slot />
      <!-- 对齐线 -->
      <refline />
    </div>
    <!-- 右键菜单 -->
    <contextmenu />
    <!-- 选中区域 -->
    <choose-area v-show="groupAreaShow" :start="areaStart" :width="areaSize.width" :height="areaSize.height" />
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import { mapState } from 'vuex'
import { $, on, off } from '@/utils/dom'
import defaultSettings from '@/config'
import Ruler from './ruler/index'
import Refline from './refline'
import ChooseArea from './area'
import Contextmenu from './contextmenu'

export default {
  name: 'Layout',
  components: {
    Ruler,
    Refline,
    ChooseArea,
    Contextmenu
  },
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl,
      areaStart: {
        x: 0,
        y: 0
      },
      areaSize: {
        width: 0,
        height: 0
      }
    }
  },
  computed: mapState([
    'items',
    'currentItem',
    'canvasConfig',
    'screenConfig',
    'groupAreaShow'
  ]),
  watch: {
    areaSize: {
      deep: true,
      handler: function(val) {
        this.items.forEach((item, index) => {
          if (item.lock === 'true') return
          const layout = this.$refs.layout.getBoundingClientRect()
          const itemRect = $(`[id='${item.elId}']`).getBoundingClientRect()

          const x = itemRect.x - layout.x + this.canvasConfig.padding
          const y = itemRect.y - layout.y + this.canvasConfig.padding
          const { width, height } = itemRect

          const top = this.areaStart.y <= y
          const left = this.areaStart.x <= x
          const right = (x + width) <= (this.areaStart.x + val.width)
          const bottom = (y + height) <= (this.areaStart.y + val.height)

          const inside = top && left && right && bottom
          if (inside) {
            this.$store.commit('addGroupIndex', index)
          } else {
            this.$store.commit('deleteGroupIndex', index)
          }
          this.$store.commit('setHoverItem', { index: index, status: inside })
        })
      }
    }
  },
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
        top: e.clientY - layout.y + this.canvasConfig.padding,
        left: e.clientX - layout.x + this.canvasConfig.padding
      })
    },
    handleMousedown(ev) {
      if (!this.currentItem) {
        ev.preventDefault()
      }
      this.hideArea()

      const layout = this.$refs.layout.getBoundingClientRect()

      this.areaStart.x = ev.clientX - layout.x + this.canvasConfig.padding
      this.areaStart.y = ev.clientY - layout.y + this.canvasConfig.padding
      this.showArea()

      const move = (e) => {
        this.areaSize.width = Math.abs(e.clientX - ev.clientX)
        this.areaSize.height = Math.abs(e.clientY - ev.clientY)
        if (e.clientX < ev.clientX) {
          this.areaStart.x = e.clientX - layout.x + this.canvasConfig.padding
        }
        if (e.clientY < ev.clientY) {
          this.areaStart.y = e.clientY - layout.y + this.canvasConfig.padding
        }
      }

      const up = (e) => {
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
        if (e.clientX - ev.clientX <= 10 && e.clientY - ev.clientY <= 10) {
          this.hideArea()
          return
        }
        this.createGroup()
      }

      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    showArea() {
      this.$store.commit('setGroupAreaShow', true)
    },
    hideArea() {
      this.areaSize.width = 0
      this.areaSize.height = 0
      this.$store.commit('setGroupAreaShow', false)
    },
    createGroup() {
      // this.hideArea()
    }
  }
}
</script>

