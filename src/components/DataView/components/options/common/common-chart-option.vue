<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <a-collapse :bordered="false" :accordion="true">
    <a-collapse-panel key="颜色配置" header="颜色配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="颜色">
          <a-select v-model="item.option.color" mode="tags" />
        </a-form-item>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="标题配置" header="标题配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示标题">
          <a-switch v-model="item.option.title.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <a-form-item v-if="item.option.title.show" label="图表标题">
          <a-input v-model="item.option.title.text" />
        </a-form-item>
        <a-form-item v-if="item.option.title.show" label="标题颜色">
          <a-input v-model="item.option.title.textStyle.color" type="color" />
        </a-form-item>
        <a-form-item v-if="item.option.title.show" label="标题位置">
          <a-select v-model="item.option.title.left">
            <a-select-option
              v-for="position in positionList"
              :key="position.value"
              :value="position.value"
            >
              {{ position.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="图例配置" header="图例配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
    </a-collapse-panel>
    <a-collapse-panel key="网格配置" header="网格配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="上">
          <a-input v-model="item.option.grid.top" />
        </a-form-item>
        <a-form-item label="下">
          <a-input v-model="item.option.grid.bottom" />
        </a-form-item>
        <a-form-item label="左">
          <a-input v-model="item.option.grid.left" />
        </a-form-item>
        <a-form-item label="右">
          <a-input v-model="item.option.grid.right" />
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { positionList } from '../common'

export default {
  name: 'CommonChartOption',
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
      positionList
    }
  }
}
</script>

<style scoped>

</style>
