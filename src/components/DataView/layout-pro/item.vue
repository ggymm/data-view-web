<template>
  <div class="data-view-item" :class="{ active }" @click="selectCurComponent" @mousedown="handleMouseDownOnShape">
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
    }
  },
  methods: {
    selectCurComponent() {

    },
    handleMouseDownOnShape() {

    }
  }
}
</script>

<style scoped>

</style>
