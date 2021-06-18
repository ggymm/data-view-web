<template>
  <a-collapse :bordered="false" :accordion="true">
    <a-collapse-panel key="通用配置" header="通用配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="是否锁定">
          <a-select v-model="item.lock">
            <a-select-option value="false">不锁定</a-select-option>
            <a-select-option value="true">锁定</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="位置配置" header="位置配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="左侧">
          <a-input-number v-model="item.x" :min="0" :precision="0" />
        </a-form-item>
        <a-form-item label="顶部">
          <a-input-number v-model="item.y" :min="0" :precision="0" />
        </a-form-item>
        <a-form-item label="宽度">
          <a-input-number v-model="item.width" :min="0" :precision="0" />
        </a-form-item>
        <a-form-item label="高度">
          <a-input-number v-model="item.height" :min="0" :precision="0" />
        </a-form-item>
        <a-form-item label="旋转角度">
          <a-input-number v-model="item.rotate" :min="0" :max="360" :precision="0" />
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
