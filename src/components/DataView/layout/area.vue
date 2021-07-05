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
  methods: {
    handleAreaChoose(ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="less">
.area {
  position: absolute;
  outline: 1px dashed var(--primary-color);
  background-color: rgba(0, 132, 255, 0.15);
}
</style>
