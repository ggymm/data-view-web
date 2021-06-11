<template>
  <div
    :class="{ active }"
    :style="itemStyle()"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleMove"
  >
    <div
      class="data-view-item-handler"
      :style="itemHandlerStyle()"
      :class="itemHandlerClass()"
    >
      <a-icon v-show="isActive()" type="reload" class="rotate-handler" @mousedown.prevent.stop="handleRotate" />
      <i
        v-for="(v, k) in points()"
        :key="k"
        :class="[`${v.name}-handler`, v.name.indexOf('-') > 0 ? 'spot-handler' : 'line-handler']"
      >
        <span
          class="control-point"
          :style="v.style"
          @mousedown.prevent.stop="handleResize($event, k)"
        />
      </i>
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/core/dom'
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
    }
  },
  data() {
    return {}
  },
  computed: mapState([
    'canvasStyle',
    'screenStyle',
    'currentItem'
  ]),
  mounted() {
  },
  methods: {
    itemStyle() {
      return {
        top: 0,
        left: 0,
        width: `${this.item.width}px`,
        height: `${this.item.height}px`,
        transform: `translate(${this.item.x}px, ${this.item.y}px) rotate(${this.item.rotate}deg)`
      }
    },
    itemHandlerStyle() {
      return {}
    },
    itemHandlerClass() {
      return {
        hidden: !this.isActive()
      }
    },
    isActive() {
      return this.active
    },
    points() {
      const cursor = getCursors(this.item.rotate)
      const transform = `scale(${1 / this.canvasStyle.scale}, ${1 / this.canvasStyle.scale})`
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
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handleRotate(ev) {
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

        // 计算旋转角度
        const angle = Math.atan2(
          centerY - e.clientY,
          centerX - e.clientX
        ) * 180 / Math.PI - startAngle

        const rotate = Math.round(angle % 360)
        // 更新组件旋转信息
        this.$store.commit('setItemStyle', { rotate: rotate < 0 ? rotate + 360 : rotate })
      }

      const up = () => {
        // 保存快照
        moved && this.$store.commit('recordSnapshot')
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleResize(ev, direction) {
      // 设置选中状态
      this.$store.commit('setCurrentItem', this.item)

      const cursor = getCursors(this.item.rotate)
      const style = {
        x: Math.round(this.item.x * this.canvasStyle.scale),
        y: Math.round(this.item.y * this.canvasStyle.scale),
        width: Math.round(this.item.width * this.canvasStyle.scale),
        height: Math.round(this.item.height * this.canvasStyle.scale),
        rotate: this.item.rotate,
        scale: this.canvasStyle.scale
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
        document.body.style.cursor = `${cursor[direction]}`
        const endPoint = { x: e.clientX - layoutRect.left, y: e.clientY - layoutRect.top }
        const newPosition = calcResizeInfo(direction, style, startPoint, symmetricPoint, endPoint)
        // 更新组件大小，位置信息
        this.$store.commit('setItemStyle', newPosition)
      }

      const up = () => {
        // 保存快照
        moved && this.$store.commit('recordSnapshot')
        document.body.style.cursor = ''
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
      this.$store.commit('setCurrentItem', this.item)

      const moveInfo = {
        x: this.item.x,
        y: this.item.y,
        width: this.item.width,
        height: this.item.height,
        sWidth: this.screenStyle.width,
        sHeight: this.screenStyle.height
      }
      const scale = this.canvasStyle.scale

      let moved = false
      const move = (e) => {
        moved = true
        const moveX = e.clientX - ev.clientX
        const moveY = e.clientY - ev.clientY
        const style = {
          x: moveInfo.x + Math.round(moveX / scale),
          y: moveInfo.y + Math.round(moveY / scale)
        }
        if (style.x < 0 || style.y < 0) return
        if (style.x + moveInfo.width > moveInfo.sWidth ||
          style.y + moveInfo.height > moveInfo.sHeight) {
          return
        }
        // 更新组件位置信息
        this.$store.commit('setItemStyle', style)
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          this.$bus.$emit('moving')
        })
      }

      const up = () => {
        // 保存快照
        moved && this.$store.commit('recordSnapshot')
        // 通知移动完毕，隐藏对齐线
        this.$bus.$emit('moved')
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    }
  }
}
</script>
