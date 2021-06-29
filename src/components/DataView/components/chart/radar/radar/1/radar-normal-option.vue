<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <chart-option :item="item" />
    <a-collapse :bordered="false">
      <a-collapse-panel key="雷达配置" header="雷达配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="中心坐标">
            <a-space>
              <a-input v-model="item.option.radar.center[0]" />
              <a-input v-model="item.option.radar.center[1]" />
            </a-space>
          </a-form-item>
          <a-form-item label="半径大小">
            <a-space>
              <a-input v-model="item.option.radar.radius[0]" />
              <a-input v-model="item.option.radar.radius[1]" />
            </a-space>
          </a-form-item>
          <a-form-item label="分割段数">
            <a-input-number v-model="item.option.radar.splitNumber" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="分割区域">
            <a-switch v-model="item.option.radar.splitArea.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="线配置" header="线配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="标记图形">
            <a-select v-model="item.option.series[0].symbol">
              <a-select-option
                v-for="symbolType in symbolTypeList"
                :key="symbolType.value"
                :value="symbolType.value"
              >
                {{ symbolType.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import { symbolTypeList } from '@/components/DataView/common/common'

export default {
  name: 'RadarNormalOption',
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
      symbolTypeList
    }
  }
}
</script>
