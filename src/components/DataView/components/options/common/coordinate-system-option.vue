<template>
  <a-collapse :bordered="false" :accordion="true">
    <a-collapse-panel key="横坐标轴设置" header="横坐标轴设置">
      <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示坐标轴">
          <a-switch v-model="item.option.xAxis.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <div v-if="item.option.xAxis.show">
          <a-form-item label="坐标轴名称">
            <a-input v-model="item.option.xAxis.name" />
          </a-form-item>
          <a-form-item label="显示坐标轴线">
            <a-switch v-model="item.option.xAxis.axisLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.axisLine.show" label="坐标轴线颜色">
            <a-input v-model="item.option.xAxis.axisLine.lineStyle.color" type="color" />
          </a-form-item>
          <a-form-item label="显示坐标轴标签">
            <a-switch v-model="item.option.xAxis.axisLabel.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.axisLabel.show" label="标签字体颜色">
            <a-input v-model="item.option.xAxis.axisLabel.color" type="color" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.axisLabel.show" label="标签旋转角度">
            <a-input-number v-model="item.option.xAxis.axisLabel.rotate" :min="-90" :max="90" />
          </a-form-item>
          <a-form-item label="显示分割线">
            <a-switch v-model="item.option.xAxis.splitLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.splitLine.show" label="分割线颜色">
            <a-select v-model="item.option.xAxis.splitLine.lineStyle.color" mode="tags" />
          </a-form-item>
        </div>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="纵坐标轴设置" header="纵坐标轴设置">
      <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  name: 'CoordinateSystemOption',
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
