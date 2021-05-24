<template>
  <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
    <a-form-item label="距离左侧">
      <a-input-number v-model="item.x" :min="0" :precision="0" />
    </a-form-item>
    <a-form-item label="距离顶部">
      <a-input-number v-model="item.y" :min="0" :precision="0" />
    </a-form-item>
    <a-form-item label="宽度">
      <a-input-number v-model="item.width" :min="0" :precision="0" />
    </a-form-item>
    <a-form-item label="高度">
      <a-input-number v-model="item.height" :min="0" :precision="0" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'CommonOption',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
