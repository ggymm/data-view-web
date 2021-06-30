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
      <!-- 边框 -->
      <i
        v-for="(v, k) in points()"
        :key="k"
        :class="[`${v.name}-handler`, v.name.indexOf('-') > 0 ? 'spot-handler' : 'line-handler']"
      >
        <span class="control-point" :style="v.style" @mousedown.prevent.stop="handleResize($event, k)" />
      </i>
      <!-- 位置坐标 -->
      <div v-show="isActive()" class="support-lines">
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
    'resizing',
    'canvasConfig',
    'screenConfig',
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
        't': { name: 'top', style: { cursor: cursor.t, transform }},
        'rt': { name: 'top-right', style: { cursor: cursor.rt, transform }},
        'r': { name: 'right', style: { cursor: cursor.r, transform }},
        'rb': { name: 'bottom-right', style: { cursor: cursor.rb, transform }},
        'b': { name: 'bottom', style: { cursor: cursor.b, transform }},
        'lb': { name: 'bottom-left', style: { cursor: cursor.lb, transform }},
        'l': { name: 'left', style: { cursor: cursor.l, transform }},
        'lt': { name: 'top-left', style: { cursor: cursor.lt, transform }}
      }
    },
    handleItemClick(ev) {
      ev.stopPropagation()
      ev.preventDefault()
    },
    handleItemChoose() {
      this.$store.commit('setCurrentItem', { item: this.item, index: this.index })
      this.$bus.$emit('layer:itemChange')
    },
    handleRotate(ev) {
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
        this.setCursor('')
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleResize(ev, direction) {
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
        this.setCursor('')
        this.$store.commit('setResizeStatus', false)
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleMove(ev) {
      // 设置选中状态
      this.handleItemChoose()

      const moveInfo = {
        x: this.item.x,
        y: this.item.y,
        width: this.item.width,
        height: this.item.height,
        sWidth: this.screenConfig.width,
        sHeight: this.screenConfig.height
      }
      const scale = this.canvasConfig.scale

      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor('move')
        const style = {
          x: moveInfo.x + Math.round((e.clientX - ev.clientX) / scale),
          y: moveInfo.y + Math.round((e.clientY - ev.clientY) / scale)
        }
        // 更新组件位置信息
        this.setItemStyle(style)
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          this.$bus.$emit('moving', this.item)
        })
      }

      const up = () => {
        this.setCursor('')
        // 通知移动完毕，隐藏对齐线
        this.$bus.$emit('moved')
        // 保存快照
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
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
