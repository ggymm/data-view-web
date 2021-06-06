<template>
  <div
    :class="{ active }"
    :style="itemStyle()"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleMove"
  >
    <a-icon v-show="isActive()" type="reload" class="rotate-handler" @mousedown="handleRotate" />
    <div
      v-for="point in (isActive()? points : [])"
      :key="point"
      class="resize-handler"
      :style="pointStyle(point)"
      @mousedown="handleResize($event, point)"
    />
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/core/dom'
import { mod360, calcResizeInfo } from './calculate'

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
    return {
      cursors: {},
      points: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'],
      initialAngle: {
        lt: 0, t: 45, rt: 90, r: 135,
        rb: 180, b: 225, lb: 270, l: 315
      },
      angleToCursor: [
        { start: 338, end: 23, cursor: 'nw' }, { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' }, { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' }, { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' }, { start: 293, end: 338, cursor: 'w' }
      ]
    }
  },
  computed: mapState([
    'canvasStyle',
    'screenStyle',
    'currentItem'
  ]),
  mounted() {
    if (this.currentItem) {
      this.cursors = this.getCursor()
    }
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
    isActive() {
      return this.active && this.currentItem.lock === 'false'
    },
    getCursor() {
      const { angleToCursor, initialAngle, points, currentItem } = this
      const rotate = mod360(currentItem.rotate)
      const result = {}
      let lastMatchIndex = -1

      points.forEach(point => {
        const angle = mod360(initialAngle[point] + rotate)
        const len = angleToCursor.length
        for (; ;) {
          lastMatchIndex = (lastMatchIndex + 1) % len
          const angleLimit = angleToCursor[lastMatchIndex]
          if (angle < 23 || angle >= 338) {
            result[point] = 'nw-resize'
            return
          }
          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + '-resize'
            return
          }
        }
      })
      return result
    },
    pointStyle(point) {
      const width = this.item.width; const height = this.item.height
      const isT = /t/.test(point); const isB = /b/.test(point)
      const isL = /l/.test(point); const isR = /r/.test(point)
      let left = isL ? 0 : width; let top = isT ? 0 : height
      if (point.length === 1) {
        if (isT || isB) {
          left = Math.floor(width / 2)
        }
        if (isL || isR) {
          top = Math.floor(height / 2)
        }
      }
      return {
        marginLeft: isR ? '-4px' : '-4px', marginTop: '-4px',
        left: `${left}px`, top: `${top}px`,
        cursor: this.cursors[point]
      }
    },
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handleRotate(ev) {
      // 已经处于选中状态
      ev.preventDefault()
      ev.stopPropagation()

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
        // 重新设置角坐标
        this.cursors = this.getCursor()
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mousemove', move)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleResize(ev, point) {
      // 已经处于选中状态
      ev.stopPropagation()
      ev.preventDefault()

      const position = {
        x: Math.round(this.item.x * this.canvasStyle.scale),
        y: Math.round(this.item.y * this.canvasStyle.scale),
        width: Math.round(this.item.width * this.canvasStyle.scale),
        height: Math.round(this.item.height * this.canvasStyle.scale),
        rotate: this.item.rotate,
        scale: this.canvasStyle.scale
      }
      // 组件宽高比
      const proportion = position.width / position.height
      // 组件中心点
      const center = { x: position.x + position.width / 2, y: position.y + position.height / 2 }
      // 当前点击坐标
      const currentPoint = { x: ev.clientX - 250, y: ev.clientY - 100 }
      // 获取对称点的坐标
      const symmetricPoint = { x: center.x - (currentPoint.x - center.x), y: center.y - (currentPoint.y - center.y) }

      let moved = false
      const move = (e) => {
        moved = true
        const currentPosition = { x: e.clientX - 250, y: e.clientY - 100 }
        const newPosition = calcResizeInfo(point, position, currentPosition, proportion, { currentPoint, symmetricPoint })
        // 更新组件大小，位置信息
        this.$store.commit('setItemStyle', newPosition)
      }

      const up = () => {
        // 保存快照
        moved && this.$store.commit('recordSnapshot')
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mousemove', move)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    handleMove(ev) {
      // 设置选中状态
      this.$store.commit('setCurrentItem', this.item)
      this.cursors = this.getCursor()

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
        const position = {
          x: moveInfo.x + Math.round(moveX / scale),
          y: moveInfo.y + Math.round(moveY / scale)
        }
        if (position.x < 0 || position.y < 0) return
        if (position.x + moveInfo.width > moveInfo.sWidth ||
          position.y + moveInfo.height > moveInfo.sHeight) {
          return
        }
        // 更新组件位置信息
        this.$store.commit('setItemStyle', position)
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          this.$bus.$emit('moving', moveY > 0, moveX > 0)
        })
      }

      const up = () => {
        // 保存快照
        moved && this.$store.commit('recordSnapshot')
        // 通知移动完毕，隐藏对齐线
        this.$bus.$emit('moved')
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mousemove', move)
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    }
  }
}
</script>

<style lang="less">
.data-view-item {
  .resize-handler {
    position: absolute;
    background: #ffffff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
  }

  .rotate-handler {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
  }
}
</style>
