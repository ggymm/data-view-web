<template>
  <div
    :class="{ active }"
    :style="itemStyle()"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleItemMousedown"
  >
    <div
      v-for="point in (isActive()? pointList : [])"
      :key="point"
      class="item-point"
      :style="pointStyle(point)"
      @mousedown="handlePointMousedown(point, $event)"
    />
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/core/dom'
import { mod360 } from './calculate'

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
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'],
      initialAngle: {
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315
      },
      angleToCursor: [
        { start: 338, end: 23, cursor: 'nw' },
        { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' },
        { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' },
        { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' },
        { start: 293, end: 338, cursor: 'w' }
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
        transform: `translate(${this.item.x}px, ${this.item.y}px)`
      }
    },
    isActive() {
      return this.active && this.currentItem.lock === 'false'
    },
    getCursor() {
      const { angleToCursor, initialAngle, pointList, currentItem } = this
      const rotate = mod360(currentItem.rotate)
      const result = {}
      let lastMatchIndex = -1

      pointList.forEach(point => {
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
        marginLeft: isR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${left}px`,
        top: `${top}px`,
        cursor: this.cursors[point]
      }
    },
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handlePointMousedown(e, point) {
    },
    handleItemMousedown(ev) {
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
        const pos = {
          x: moveInfo.x + Math.round(moveX / scale),
          y: moveInfo.y + Math.round(moveY / scale)
        }
        if (pos.x < 0 || pos.y < 0) return
        if (pos.x + moveInfo.width > moveInfo.sWidth ||
          pos.y + moveInfo.height > moveInfo.sHeight) {
          return
        }
        this.$store.commit('setItemStyle', pos)
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
.item-point {
  position: absolute;
  background: #ffffff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
