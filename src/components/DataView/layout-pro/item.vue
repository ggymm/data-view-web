<template>
  <div
    :class="{ active }"
    :style="itemStyle()"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleItemMousedown"
  >
    <template v-for="(v, k) in (isActive()? points() : [])">
      <i
        v-if="v.rotateStyle"
        :key="k"
        :class="`${v.name}-handler`"
        class="spot-handler"
      >
        <span
          class="rotate-handler"
          :style="v.rotateStyle"
        >
          <span
            class="control-point"
            :style="v.style"
          />
        </span>
      </i>
      <i
        v-else
        :key="k"
        :class="`${v.name}-handler`"
        class="line-handler"
      >
        <span
          class="control-point"
          :style="v.style"
        />
      </i>
    </template>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/core/dom'
import { getCursors } from './calculate'

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
  computed: {
    ...mapState([
      'canvasStyle',
      'screenStyle',
      'currentItem'
    ])
  },
  mounted() {
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
    points() {
      const cursor = getCursors(this.item.rotate)

      const transform = ``
      return {
        't': {
          name: 'top',
          style: { cursor: cursor.t, transform }
        },
        'rt': {
          name: 'top-right',
          style: { cursor: cursor.rt, transform },
          rotateStyle: {}
        },
        'r': {
          name: 'right',
          style: { cursor: cursor.r, transform }
        },
        'rb': {
          name: 'bottom-right',
          style: { cursor: cursor.rb },
          rotateStyle: { 'transform-origin': '25% 25%', transform }
        },
        'b': {
          name: 'bottom',
          style: { cursor: cursor.b, transform }
        },
        'lb': {
          name: 'bottom-left',
          style: { cursor: cursor.lb },
          rotateStyle: { 'transform-origin': '75% 25%', transform }
        },
        'l': {
          name: 'left',
          style: { cursor: cursor.l, transform }
        },
        'lt': {
          name: 'top-left',
          style: { cursor: cursor.lt },
          rotateStyle: { 'transform-origin': '75% 75%', transform }
        }
      }
    },
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handleItemMousedown(ev) {
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

      let hasMove = false
      const move = (e) => {
        hasMove = true
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
        hasMove && this.$store.commit('recordSnapshot')

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
