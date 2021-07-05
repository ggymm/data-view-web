<template>
  <div
    v-show="item.show === 'true'"
    :class="{ active }"
    :style="itemStyle()"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleMove"
  >
    <div
      class="data-view-item-handler"
      :class="itemHandlerClass()"
      @mouseenter="item.hover = true"
      @mouseleave="item.hover = false"
    >
      <!-- 旋转 -->
      <a-icon v-show="isActive()" type="reload" class="rotate-handler" @mousedown.prevent.stop="handleRotate" />
      <!-- 边界点和框线 -->
      <div class="resize-handler">
        <i v-for="(v, k) in points()" :key="k" class="drag-dot" :style="v.style" @mousedown.prevent.stop="handleResize($event, k)" />
      </div>
      <!-- 位置坐标 -->
      <div v-show="isActive() && canvasConfig.indicatorLine && moving" class="indicator-lines">
        <span class="x-line" :style="lineXStyle()" />
        <span class="y-line" :style="lineYStyle()" />
        <span class="coordinate">{{ item.x }}，{{ item.y }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/utils/dom'
import { getCursors, calcResizeInfo } from './calculate'

export default {
  name: 'Item',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {}
  },
  computed: mapState([
    'moving',
    'resizing',
    'canvasConfig',
    'screenConfig',
    'refline',
    'currentItem'
  ]),
  mounted() {
  },
  methods: {
    itemStyle() {
      return {
        zIndex: this.index + 9,
        top: 0,
        left: 0,
        width: `${this.item.width}px`,
        height: `${this.item.height}px`,
        transform: `translate(${this.item.x}px, ${this.item.y}px) rotate(${this.item.rotate}deg)`
      }
    },
    lineXStyle() {
      return {
        width: `${this.item.x / this.canvasConfig.scale}px`,
        borderWidth: `${1 / this.canvasConfig.scale}px`
      }
    },
    lineYStyle() {
      return {
        height: `${this.item.y / this.canvasConfig.scale}px`,
        borderWidth: `${1 / this.canvasConfig.scale}px`
      }
    },
    itemHandlerClass() {
      // 当前组件不是选中的
      // 当前组件没有正在进行拖拽
      // 当前组件处于hover状态
      return {
        'hover': !this.isActive() && !this.resizing && this.item.hover
      }
    },
    isActive() {
      return this.active
    },
    points() {
      const cursor = getCursors(this.item.rotate)
      const transform = `scale(${1 / this.canvasConfig.scale}, ${1 / this.canvasConfig.scale})`
      return {
        't': { name: 'top', style: { top: '-4px', left: '50%', marginLeft: '-4px', cursor: cursor.t, transform }},
        'rt': { name: 'top-right', style: { top: '-4px', right: '-4px', cursor: cursor.rt, transform }},
        'r': { name: 'right', style: { top: '50%', right: '-4px', marginTop: '-4px', cursor: cursor.r, transform }},
        'rb': { name: 'bottom-right', style: { right: '-4px', bottom: '-4px', cursor: cursor.rb, transform }},
        'b': { name: 'bottom', style: { left: '50%', bottom: '-4px', marginLeft: '-4px', cursor: cursor.b, transform }},
        'lb': { name: 'bottom-left', style: { left: '-4px', bottom: '-4px', cursor: cursor.lb, transform }},
        'l': { name: 'left', style: { top: '50%', left: '-4px', marginTop: '-4px', cursor: cursor.l, transform }},
        'lt': { name: 'top-left', style: { top: '-4px', left: '-4px', cursor: cursor.lt, transform }}
      }
    },
    handleItemClick(ev) {
      ev.stopPropagation()
      ev.preventDefault()

      this.$store.commit('hideContextmenu')
    },
    handleItemChoose() {
      this.$store.commit('setClickItem', true)
      this.$store.commit('setCurrentItem', { item: this.item, index: this.index })
      this.$bus.$emit('layer:itemChange')
    },
    handleRotate(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      // 已经处于选中状态
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const startAngle = Math.atan2(
        centerY - ev.clientY,
        centerX - ev.clientX
      ) * 180 / Math.PI - this.item.rotate

      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor('grab')
        // 计算旋转角度
        const angle = Math.atan2(
          centerY - e.clientY,
          centerX - e.clientX
        ) * 180 / Math.PI - startAngle

        const rotate = Math.round(angle % 360)
        // 更新组件旋转信息
        this.setItemStyle({ rotate: rotate < 0 ? rotate + 360 : rotate })
      }

      const up = () => {
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)

        // 重置光标样式
        this.setCursor('')
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleResize(ev, direction) {
      ev.preventDefault()
      ev.stopPropagation()
      // 可能没有处于选中状态
      // 需要设置选中状态
      this.handleItemChoose()

      const cursor = getCursors(this.item.rotate)
      const style = {
        x: Math.round(this.item.x * this.canvasConfig.scale),
        y: Math.round(this.item.y * this.canvasConfig.scale),
        width: Math.round(this.item.width * this.canvasConfig.scale),
        height: Math.round(this.item.height * this.canvasConfig.scale),
        rotate: this.item.rotate,
        scale: this.canvasConfig.scale
      }
      // 组件中心点
      const center = { x: style.x + style.width / 2, y: style.y + style.height / 2 }
      // 获取画布位移信息
      const layoutRect = document.querySelector('#data-view-layout').getBoundingClientRect()
      // 当前点击坐标
      const startPoint = { x: ev.clientX - layoutRect.left, y: ev.clientY - layoutRect.top }
      // 获取对称点的坐标
      const symmetricPoint = { x: center.x - (startPoint.x - center.x), y: center.y - (startPoint.y - center.y) }

      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor(cursor[direction])
        this.$store.commit('setResizeStatus', true)
        // 计算新的位置
        const newStyle = calcResizeInfo(direction, style, startPoint, symmetricPoint, {
          x: e.clientX - layoutRect.left,
          y: e.clientY - layoutRect.top
        })
        // 更新组件大小，位置信息
        this.setItemStyle(newStyle)
      }

      const up = () => {
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
        // 重置光标样式
        this.setCursor('')
        // 设置组件缩放状态
        this.$store.commit('setResizeStatus', false)
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleMove(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      // 设置选中状态
      this.handleItemChoose()

      // 设置refline
      let updater
      let startX
      let startY
      if (this.canvasConfig.refLine) {
        this.$store.commit('setRefline')
        updater = this.refline.adsorbCreator({
          current: {
            key: this.index,
            left: this.item.x,
            top: this.item.y,
            width: this.item.width,
            height: this.item.height,
            rotate: this.item.rotate
          },
          pageX: ev.clientX,
          pageY: ev.clientY,
          distance: 5,
          // distance: 50,
          disableAdsorb: false
        })
      } else {
        startX = this.item.x
        startY = this.item.y
      }

      const scale = this.canvasConfig.scale

      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor('move')
        this.$store.commit('setMoveStatus', true)
        if (this.canvasConfig.refLine) {
          const { delta } = updater({
            pageX: e.clientX,
            pageY: e.clientY
          })
          this.item.x += Math.round(delta.left / scale)
          this.item.y += Math.round(delta.top / scale)
        } else {
          this.item.x = startX + Math.round((e.clientX - ev.clientX) / scale)
          this.item.y = startY + Math.round((e.clientY - ev.clientY) / scale)
        }
      }

      const up = () => {
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
        // 重置光标样式
        this.setCursor('')
        // 设置组件移动状态
        this.$store.commit('setMoveStatus', false)
        // 隐藏参考线
        this.$store.commit('hideRefline')
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    setItemStyle(style) {
      if (style.x) this.item.x = style.x
      if (style.y) this.item.y = style.y
      if (style.width) this.item.width = style.width
      if (style.height) this.item.height = style.height
      if (style.rotate) this.item.rotate = style.rotate
    },
    setCursor(cursor) {
      document.body.style.cursor = cursor
    }
  }
}
</script>
