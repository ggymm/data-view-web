<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-panel key="状态样式" header="状态样式">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="圆心半径">
            <a-input-number v-model="item.option.radius" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="边界半径">
            <a-input-number v-model="item.option.boundary" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="扩散大小">
            <a-input-number v-model="item.option.spread" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="标识大小">
            <a-input-number v-model="item.option.symbolSize" :min="0" :precision="0" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="状态列表" header="状态列表">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: 'EarlyWarningOption',
  components: {
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>
