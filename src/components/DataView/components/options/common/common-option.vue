<template>
  <a-collapse :bordered="false" :accordion="true">
    <a-collapse-panel key="坐标配置" header="坐标配置">
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
    </a-collapse-panel>
  </a-collapse>
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
