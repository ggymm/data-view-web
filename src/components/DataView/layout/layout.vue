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
    <choose-area v-show="areaShow" :start="areaStart" :width="areaSize.width" :height="areaSize.height" />
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import { mapState } from 'vuex'
import { on, off } from '@/utils/dom'
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
      },
      areaShow: false
    }
  },
  computed: mapState([
    'currentItem',
    'canvasConfig',
    'screenConfig'
  ]),
  watch: {
    areaSize: {
      deep: true,
      handler: function(val) {
        console.log(val.width, val.height)
        // 修改组件的hover状态
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
        if (e.clientX === ev.clientX && e.clientY === ev.clientY) {
          this.hideArea()
          return
        }
        this.createGroup()
      }

      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    showArea() {
      this.areaShow = true
    },
    hideArea() {
      this.areaShow = false
      this.areaSize.width = 0
      this.areaSize.height = 0
    },
    createGroup() {
      // this.hideArea()
    }
  }
}
</script>

