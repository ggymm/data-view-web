<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <chart-option :item="item" />
    <coordinate-system-option :item="item" />
    <a-collapse :bordered="false">
      <a-collapse-panel key="折线配置" header="折线配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <div v-for="(s, i) in item.option.series" :key="i">
            <a-form-item :label="'是否平滑-' + i">
              <a-switch v-model="s.smooth" checked-children="显示" un-checked-children="不显示" />
            </a-form-item>
            <a-form-item :label="'是否显示折点-' + i">
              <a-switch v-model="s.showSymbol" checked-children="显示" un-checked-children="不显示" />
            </a-form-item>
            <a-form-item :label="'折线类型-' + i">
              <a-select v-model="s.lineStyle.type">
                <a-select-option
                  v-for="lineType in lineTypeList"
                  :key="lineType.value"
                  :value="lineType.value"
                >
                  {{ lineType.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="'区域颜色-' + i">
              <a-input v-model="s.areaStyle.color" />
            </a-form-item>
          </div>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import CoordinateSystemOption from '@/components/DataView/common/option/coordinate-system'
import { lineTypeList } from '@/components/DataView/common/common'

export default {
  name: 'LineAreaOption',
  components: {
    ChartOption,
    CoordinateSystemOption
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
      lineTypeList
    }
  }
}
</script>
