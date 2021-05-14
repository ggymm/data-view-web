<template>
  <div ref="item" :style="position" class="data-view-item">
    <slot />
    <span ref="handle" :class="resizableHandleClass" />
  </div>
</template>

<script>
import { getControlPosition, createCoreData } from './draggable'
import interact from 'interactjs'

export default {
  name: 'Item',
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    i: {
      type: undefined,
      required: true
    },
    panelWidth: {
      type: Number,
      required: true
    },
    panelHeight: {
      type: Number,
      required: true
    },
    dragIgnoreFrom: {
      type: String,
      required: false,
      default: 'a, button'
    },
    dragAllowFrom: {
      type: String,
      required: false,
      default: null
    },
    resizeIgnoreFrom: {
      type: String,
      required: false,
      default: 'a, button'
    },
    minH: {
      type: Number,
      required: false,
      default: 1
    },
    minW: {
      type: Number,
      required: false,
      default: 1
    },
    maxH: {
      type: Number,
      required: false,
      default: Infinity
    },
    maxW: {
      type: Number,
      required: false,
      default: Infinity
    }
  },
  inject: ['eventBus'],
  data: function() {
    return {
      position: {},
      interactObj: null,
      dragEventSet: false,
      resizeEventSet: false,
      isDragging: false,
      dragging: null,
      isResizing: false,
      resizing: null,
      lastX: NaN,
      lastY: NaN,
      lastW: NaN,
      lastH: NaN,
      previousW: null,
      previousH: null,
      previousX: null,
      previousY: null,
      innerX: this.x,
      innerY: this.y,
      innerWidth: this.width,
      innerHeight: this.height
    }
  },
  computed: {
    resizableHandleClass() {
      return 'vue-resizable-handle'
    }
  },
  watch: {
    x: function(newVal) {
      this.innerX = newVal
      this.createStyle()
    },
    y: function(newVal) {
      this.innerY = newVal
      this.createStyle()
    },
    width: function(newVal) {
      this.innerWidth = newVal
      this.createStyle()
    },
    height: function(newVal) {
      this.innerHeight = newVal
      this.createStyle()
    }
  },
  created() {
    const self = this
    self.compactHandler = function(layout) {
      self.compact(layout)
    }
    this.eventBus.$on('compact', self.compactHandler)
  },
  beforeDestroy: function() {
    const self = this
    this.eventBus.$off('compact', self.compactHandler)
    this.interactObj.unset()
  },
  mounted() {
    this.createStyle()
    this.draggable()
    this.resizable()
  },
  methods: {
    createStyle: function() {
      var pos = { left: this.innerX, top: this.innerY, width: this.innerWidth, height: this.innerHeight }

      if (this.isDragging) {
        pos.top = this.dragging.top
        pos.left = this.dragging.left
      }
      if (this.isResizing) {
        pos.width = this.resizing.width
        pos.height = this.resizing.height
      }
      this.position = {
        top: pos.top + 'px',
        left: pos.left + 'px',
        width: pos.width + 'px',
        height: pos.height + 'px'
      }
    },
    draggable: function() {
      var self = this
      if (this.interactObj === null || this.interactObj === undefined) {
        this.interactObj = interact(this.$refs['item'])
      }
      var opts = {
        ignoreFrom: this.dragIgnoreFrom,
        allowFrom: this.dragAllowFrom
      }
      this.interactObj.draggable(opts)
      if (!this.dragEventSet) {
        this.dragEventSet = true
        this.interactObj.on('dragstart dragmove dragend', function(event) {
          self.handleDrag(event)
        })
      }
    },
    resizable: function() {
      var self = this
      if (this.interactObj === null || this.interactObj === undefined) {
        this.interactObj = interact(this.$refs['item'])
      }
      var opts = {
        preserveAspectRatio: false,
        edges: {
          left: false,
          right: '.' + this.resizableHandleClass,
          bottom: '.' + this.resizableHandleClass,
          top: false
        },
        ignoreFrom: this.resizeIgnoreFrom
      }

      this.interactObj.resizable(opts)
      if (!this.resizeEventSet) {
        this.resizeEventSet = true
        this.interactObj.on('resizestart resizemove resizeend', function(event) {
          self.handleResize(event)
        })
      }
    },
    handleDrag: function(event) {
      // 正在缩放时不可以移动
      if (this.isResizing) return
      const position = getControlPosition(event)
      if (position === null) return
      const { x, y } = position
      const newPosition = { top: 0, left: 0 }
      switch (event.type) {
        case 'dragstart':
          this.previousX = this.innerX
          this.previousY = this.innerY
          var parentRect = event.target.offsetParent.getBoundingClientRect()
          var clientRect = event.target.getBoundingClientRect()
          newPosition.left = clientRect.left - parentRect.left
          newPosition.top = clientRect.top - parentRect.top
          this.dragging = newPosition
          this.isDragging = true
          break
        case 'dragend':
          if (!this.isDragging) return
          parentRect = event.target.offsetParent.getBoundingClientRect()
          clientRect = event.target.getBoundingClientRect()
          newPosition.left = clientRect.left - parentRect.left
          newPosition.top = clientRect.top - parentRect.top
          this.innerX = newPosition.left
          this.innerY = newPosition.top
          this.dragging = null
          this.isDragging = false
          break
        case 'dragmove':
          var coreEvent = createCoreData(this.lastX, this.lastY, x, y)
          newPosition.left = this.dragging.left + coreEvent.deltaX
          newPosition.top = this.dragging.top + coreEvent.deltaY
          var pos = this.calcXY(newPosition.left, newPosition.top)
          newPosition.left = pos.left
          newPosition.top = pos.top
          this.dragging = newPosition
          break
      }
      this.lastX = x
      this.lastY = y
      // 告诉父层，更新配置状态
      this.eventBus.$emit('dragEvent', event.type, this.i, newPosition.left, newPosition.top, this.innerHeight, this.innerWidth)
    },
    calcXY(left, top) {
      // 计算当前位置是否符合规则
      return { left: Math.max(Math.min(left, this.panelWidth - this.innerWidth), 0),
        top: Math.max(Math.min(top, this.panelHeight - this.innerHeight), 0) }
    },
    handleResize: function(event) {
      const position = getControlPosition(event)
      if (position == null) return
      const { x, y } = position

      const newSize = { width: 0, height: 0 }
      switch (event.type) {
        case 'resizestart':
          this.previousW = this.innerWidth
          this.previousH = this.innerHeight
          newSize.width = this.innerWidth
          newSize.height = this.innerHeight
          this.resizing = newSize
          this.isResizing = true
          break
        case 'resizemove':
          var coreEvent = createCoreData(this.lastW, this.lastH, x, y)
          newSize.width = this.resizing.width + coreEvent.deltaX
          newSize.height = this.resizing.height + coreEvent.deltaY
          this.resizing = newSize
          break
        case 'resizeend':
          this.innerWidth = this.resizing.width
          this.innerHeight = this.resizing.height
          newSize.width = this.innerWidth
          newSize.height = this.innerHeight
          this.resizing = null
          this.isResizing = false
          break
      }
      // Get new WH
      var nowPos = { h: newSize.height, w: newSize.width }
      if (nowPos.w < this.minW) {
        nowPos.w = this.minW
      }
      if (nowPos.w > this.maxW) {
        nowPos.w = this.maxW
      }
      if (nowPos.h < this.minH) {
        nowPos.h = this.minH
      }
      if (nowPos.h > this.maxH) {
        nowPos.h = this.maxH
      }
      if (nowPos.h < 1) {
        nowPos.h = 1
      }
      if (nowPos.w < 1) {
        nowPos.w = 1
      }
      this.lastW = x
      this.lastH = y

      // 告诉父层，更新配置状态
      this.eventBus.$emit('resizeEvent', event.type, this.i, this.innerX, this.innerY, nowPos.h, nowPos.w)
    },
    compact: function() {
      this.createStyle()
    }
  }
}
</script>

<style>
  .data-view-item {
    position: absolute;
  }
  .data-view-item > .vue-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
  }
</style>
