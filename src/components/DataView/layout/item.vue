<template>
  <div
    v-show="item.show === 'true'"
    :class="{ active }"
    :style="itemStyle"
    class="data-view-item"
    @click="handleItemClick"
    @mousedown.prevent.stop="handleMove"
  >
    <div
      class="data-view-item-handler"
      :class="itemHandlerClass()"
      :style="{ transform: `rotate(${item.style.rotate}deg)` }"
      @mouseenter="item.hover = true"
      @mouseleave="item.hover = false"
    >
      <!-- 旋转 -->
      <a-icon v-show="isActive()" type="reload" class="rotate-handler" @mousedown.prevent.stop="handleRotate" />
      <!-- 边界点和框线 -->
      <div class="resize-handler">
        <i v-for="(v, k) in points()" :key="k" class="drag-dot" :style="v.style" @mousedown.prevent.stop="handleResize($event, k)" />
      </div>
      <slot />
    </div>
    <!-- 位置坐标 -->
    <div v-show="isActive() && canvasConfig.indicatorLine && moving" class="indicator-lines">
      <span class="x-line" :style="lineXStyle" />
      <span class="y-line" :style="lineYStyle" />
      <span class="coordinate">{{ item.style.x }}，{{ item.style.y }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off } from '@/utils/dom'
import { EventBus } from '@/utils/event-bus'
import { getCursors, calcResizeSimple, calcResizeWithRotate } from './calculate'

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
  computed: {
    itemStyle() {
      return {
        zIndex: this.index + 9,
        top: 0,
        left: 0,
        width: `${this.item.style.width}px`,
        height: `${this.item.style.height}px`,
        transform: `translate(${this.item.style.x}px, ${this.item.style.y}px)`
      }
    },
    lineXStyle() {
      return {
        width: `${this.item.style.x / this.canvasConfig.scale}px`,
        borderWidth: `${1 / this.canvasConfig.scale}px`
      }
    },
    lineYStyle() {
      return {
        height: `${this.item.style.y / this.canvasConfig.scale}px`,
        borderWidth: `${1 / this.canvasConfig.scale}px`
      }
    },
    ...mapState([
      'moving',
      'resizing',
      'canvasConfig',
      'screenConfig'
    ])
  },
  mounted() {
  },
  methods: {
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
      const cursor = getCursors(this.item.style.rotate)
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
      EventBus.$emit('layer:itemChange')
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
      ) * 180 / Math.PI - this.item.style.rotate

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
        this.setItemPosition({ rotate: rotate < 0 ? rotate + 360 : rotate })
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

      const cursor = getCursors(this.item.style.rotate)
      const currPosition = {
        ...this.item.style,
        scale: this.canvasConfig.scale
      }

      let moved = false
      let move
      if (this.item.style.rotate === 0 || this.item.style.rotate === 360) {
        move = (e) => {
          moved = true
          this.setCursor(cursor[direction])
          this.$store.commit('setResizeStatus', true)
          // 计算新的位置
          const position = calcResizeSimple(direction, currPosition,
            { x: ev.clientX, y: ev.clientY },
            { x: e.clientX, y: e.clientY })
          // 更新组件大小，位置信息
          this.setItemPosition(position)
        }
      } else {
        // 组件中心点
        const center = {
          x: (currPosition.x + currPosition.width / 2) * currPosition.scale,
          y: (currPosition.y + currPosition.height / 2) * currPosition.scale
        }
        // 获取画布位移信息
        const layoutRect = document.querySelector('#data-view-layout').getBoundingClientRect()
        // 当前点的和点击位置的距离
        const pointRect = ev.target.getBoundingClientRect()
        // 当前点击坐标
        const startPoint = {
          x: Math.round(pointRect.left - layoutRect.left + ev.target.offsetWidth / 2),
          y: Math.round(pointRect.top - layoutRect.top + ev.target.offsetHeight / 2)
        }
        // 获取对称点的坐标
        const symmetricPoint = { x: center.x - (startPoint.x - center.x), y: center.y - (startPoint.y - center.y) }

        move = (e) => {
          moved = true
          this.setCursor(cursor[direction])
          this.$store.commit('setResizeStatus', true)
          // 计算新的位置
          const position = calcResizeWithRotate(direction, currPosition, startPoint, symmetricPoint, {
            x: e.clientX - layoutRect.left,
            y: e.clientY - layoutRect.top
          })
          // 更新组件大小，位置信息
          this.setItemPosition(position)
        }
      }

      const up = () => {
        // 移除监听
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
        // 重置光标样式
        this.setCursor('')
        // 设置组件缩放状态
        this.$store.commit('setResizeStatus', false)
        // 保存快照, 用于撤销重做
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

      const scale = this.canvasConfig.scale
      const itemStyle = { ...this.item.style }
      const position = {}

      let moved = false
      const move = (e) => {
        moved = true
        this.setCursor('move')
        this.$store.commit('setMoveStatus', true)
        position.x = itemStyle.x + Math.round((e.clientX - ev.clientX) / scale)
        position.y = itemStyle.y + Math.round((e.clientY - ev.clientY) / scale)

        this.item.style = { ...this.item.style, ...position }
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
        // 保存快照, 用于撤销重做
        if (moved) {
          this.$store.dispatch('recordSnapshot')
        }
      }

      // 添加监听
      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    },
    setItemPosition(position) {
      if (position.x) this.item.style.x = position.x
      if (position.y) this.item.style.y = position.y
      if (position.width) this.item.style.width = position.width
      if (position.height) this.item.style.height = position.height
      if (position.rotate) this.item.style.rotate = position.rotate
    },
    setCursor(cursor) {
      document.body.style.cursor = cursor
    }
  }
}
</script>
