<template>
  <div
    :style="{
      left: start.x + 'px',
      top: start.y + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="area"
    @mousedown="handleAreaChoose"
  />
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/utils/dom'

export default {
  props: {
    start: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: mapState([
    'items',
    'groupIndex',
    'canvasConfig'
  ]),
  methods: {
    handleAreaChoose(ev) {
      ev.preventDefault()
      ev.stopPropagation()

      const scale = this.canvasConfig.scale

      let { clientX, clientY } = ev
      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor('move')
        const moveX = Math.round((e.clientX - clientX) / scale)
        const moveY = Math.round((e.clientY - clientY) / scale)
        // 更新所有的选中组件位置信息
        for (const i of this.groupIndex) {
          this.items[i].x += moveX
          this.items[i].y += moveY
        }
        // 移动框选区域的位置信息
        // fix: Math.round误差问题
        this.start.x += Math.round((e.clientX - clientX) / scale) * scale
        this.start.y += Math.round((e.clientY - clientY) / scale) * scale
        // 更新起始点
        clientX = e.clientX
        clientY = e.clientY
      }

      const up = () => {
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
        // 重置光标样式
        this.setCursor('')
        // 保存快照, 用于撤销重做
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
      }

      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    setCursor(cursor) {
      document.body.style.cursor = cursor
    }
  }
}
</script>

<style lang="less">
.area {
  z-index: 99999;
  position: absolute;
  outline: 1px dashed var(--primary-color);
  background-color: rgba(0, 132, 255, 0.15);
}
</style>
