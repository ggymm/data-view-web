<template>
  <div
    :style="{
      left: start.x + 'px',
      top: start.y + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="area"
  />
</template>

<script>
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
  }
}
</script>

<style lang="less" scoped>
.area {
  border: 1px solid #70c0ff;
  position: absolute;
}
</style>
