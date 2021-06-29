<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <a-collapse :bordered="false">
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
    <a-collapse-panel key="横坐标轴配置" header="横坐标轴配置">
      <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示">
          <a-switch v-model="item.option.xAxis.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select v-model="item.option.xAxis.type">
            <a-select-option
              v-for="axisType in axisTypeList"
              :key="axisType.value"
              :value="axisType.value"
            >
              {{ axisType.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="item.option.xAxis.type === 'category'" label="是否留白">
          <a-switch v-model="item.option.xAxis.boundaryGap" checked-children="保留" un-checked-children="不保留" />
        </a-form-item>
        <template v-if="item.option.xAxis.show">
          <a-form-item label="名称">
            <a-input v-model="item.option.xAxis.name" />
          </a-form-item>
          <a-form-item label="显示轴线">
            <a-switch v-model="item.option.xAxis.axisLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.axisLine.show" label="坐标轴线颜色">
            <a-input v-model="item.option.xAxis.axisLine.lineStyle.color" />
          </a-form-item>
          <a-form-item label="显示标签">
            <a-switch v-model="item.option.xAxis.axisLabel.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <template v-if="item.option.xAxis.axisLabel.show">
            <a-form-item label="标签字体颜色">
              <a-input v-model="item.option.xAxis.axisLabel.color" />
            </a-form-item>
            <a-form-item label="标签旋转角度">
              <a-input-number v-model="item.option.xAxis.axisLabel.rotate" :min="-90" :max="90" />
            </a-form-item>
          </template>
          <a-form-item label="显示分割线">
            <a-switch v-model="item.option.xAxis.splitLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.xAxis.splitLine.show" label="分割线颜色">
            <a-select v-model="item.option.xAxis.splitLine.lineStyle.color" mode="tags" />
          </a-form-item>
        </template>
        <a-form-item label="显示刻度">
          <a-switch v-model="item.option.xAxis.axisTick.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="纵坐标轴配置" header="纵坐标轴配置">
      <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示">
          <a-switch v-model="item.option.yAxis.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select v-model="item.option.yAxis.type">
            <a-select-option
              v-for="axisType in axisTypeList"
              :key="axisType.value"
              :value="axisType.value"
            >
              {{ axisType.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="item.option.yAxis.type === 'category'" label="是否留白">
          <a-switch v-model="item.option.yAxis.boundaryGap" checked-children="保留" un-checked-children="不保留" />
        </a-form-item>
        <template v-if="item.option.yAxis.show">
          <a-form-item label="名称">
            <a-input v-model="item.option.yAxis.name" />
          </a-form-item>
          <a-form-item label="显示轴线">
            <a-switch v-model="item.option.yAxis.axisLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.yAxis.axisLine.show" label="坐标轴线颜色">
            <a-input v-model="item.option.yAxis.axisLine.lineStyle.color" />
          </a-form-item>
          <a-form-item label="显示标签">
            <a-switch v-model="item.option.yAxis.axisLabel.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <template v-if="item.option.yAxis.axisLabel.show">
            <a-form-item label="标签字体颜色">
              <a-input v-model="item.option.yAxis.axisLabel.color" />
            </a-form-item>
            <a-form-item label="标签旋转角度">
              <a-input-number v-model="item.option.yAxis.axisLabel.rotate" :min="-90" :max="90" />
            </a-form-item>
          </template>
          <a-form-item label="显示分割线">
            <a-switch v-model="item.option.yAxis.splitLine.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item v-if="item.option.yAxis.splitLine.show" label="分割线颜色">
            <a-select v-model="item.option.yAxis.splitLine.lineStyle.color" mode="tags" />
          </a-form-item>
        </template>
        <a-form-item label="显示刻度">
          <a-switch v-model="item.option.yAxis.axisTick.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { axisTypeList } from '../common'

export default {
  name: 'CoordinateSystemOption',
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
      axisTypeList
    }
  }
}
</script>
