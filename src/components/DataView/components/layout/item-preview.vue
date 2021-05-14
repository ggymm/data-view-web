<template>
  <div ref="item" :style="position" class="data-view-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ItemPreview',
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
    }
  },
  inject: ['eventBus'],
  data: function() {
    return {
      position: {},
      innerX: this.x,
      innerY: this.y,
      innerWidth: this.width,
      innerHeight: this.height
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
  },
  beforeDestroy: function() {
  },
  mounted() {
    this.createStyle()
  },
  methods: {
    createStyle: function() {
      var pos = { left: this.innerX, top: this.innerY, width: this.innerWidth, height: this.innerHeight }
      this.position = {
        top: pos.top + 'px',
        left: pos.left + 'px',
        width: pos.width + 'px',
        height: pos.height + 'px'
      }
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
