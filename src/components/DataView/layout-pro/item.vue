<template>
  <div class="data-view-item" :class="{ active }" @click="handleItemClick" @mousedown="handleItemMousedown">
    <slot />
  </div>
</template>

<script>
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
  methods: {
    handleItemClick(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
    },
    handleItemMousedown(e) {
      e.stopPropagation()
      this.$emit('transferHandleItemChoose', this.item)
    }
  }
}
</script>

<style scoped>

</style>
