<template>
  <div class="data-view-item" :class="{ active }" @click="handleItemClick" @mousedown="handleItemMousedown">
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
import { mod360 } from './translate'

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
    'currentItem'
  ]),
  mounted() {
    if (this.currentItem) {
      this.cursors = this.getCursor()
    }
  },
  methods: {
    isActive() {
      return this.active
    },
    getCursor() {
      const { angleToCursor, initialAngle, pointList, currentItem } = this
      const rotate = mod360(currentItem.rotate)
      const result = {}
      let lastMatchIndex = -1
      pointList.forEach(point => {
        const angle = mod360(initialAngle[point] + rotate)
        const len = angleToCursor.length
        for (;;) {
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
      const width = this.item.width
      const height = this.item.height
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = Math.floor(height / 2)
        }
      }

      return {
        marginLeft: hasR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: this.cursors[point]
      }
    },
    handlePointMousedown(e, point) {

    },
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handleItemMousedown(e) {
      e.stopPropagation()
      this.$store.commit('setCurrentItem', this.item)
      this.cursors = this.getCursor()
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
