<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <chart-option :item="item" />
    <a-collapse :bordered="false">
      <a-collapse-panel key="视觉映射配置" header="视觉映射配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="显示">
            <a-switch v-model="item.option.visualMap.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <template v-if="item.option.visualMap.show">
            <a-form-item label="类型">
              <a-select v-model="item.option.visualMap.type">
                <a-select-option
                  v-for="visualMapType in visualMapTypeList"
                  :key="visualMapType.value"
                  :value="visualMapType.value"
                >
                  {{ visualMapType.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-if="item.option.visualMap.type === 'continuous'" label="拖拽手柄">
              <a-switch v-model="item.option.visualMap.calculable" checked-children="显示" un-checked-children="不显示" />
            </a-form-item>
            <a-form-item label="位置(左)">
              <a-select v-model="item.option.visualMap.left">
                <a-select-option
                  v-for="position in positionList"
                  :key="position.value"
                  :value="position.value"
                >
                  {{ position.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="位置(上)">
              <a-select v-model="item.option.visualMap.top">
                <a-select-option
                  v-for="position in positionTopList"
                  :key="position.value"
                  :value="position.value"
                >
                  {{ position.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="两端文本">
              <a-row :gutter="20">
                <a-col :span="12">
                  <a-input v-model="item.option.visualMap.text[0]" />
                </a-col>
                <a-col :span="12">
                  <a-input v-model="item.option.visualMap.text[1]" />
                </a-col>
              </a-row>
            </a-form-item>
          </template>
          <a-form-item label="最小值">
            <a-input-number v-model="item.option.visualMap.min" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="最大值">
            <a-input-number v-model="item.option.visualMap.max" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="颜色列表">
            <a-select v-model="item.option.visualMap.color" mode="tags" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="地图配置" header="地图配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="颜色">
            <a-input v-model="item.option.series[0].itemStyle.color" />
          </a-form-item>
          <a-form-item label="区域颜色">
            <a-input v-model="item.option.series[0].itemStyle.areaColor" />
          </a-form-item>
          <a-form-item label="边框颜色">
            <a-input v-model="item.option.series[0].itemStyle.borderColor" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import { visualMapTypeList, positionList, positionTopList } from '@/components/DataView/common/common'

export default {
  name: 'MapChinaOption',
  components: {
    ChartOption
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
      visualMapTypeList,
      positionList,
      positionTopList
    }
  }
}
</script>
