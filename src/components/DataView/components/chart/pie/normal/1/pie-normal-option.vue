<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <chart-option :item="item" />
    <a-collapse :bordered="false">
      <a-collapse-panel key="扇形配置" header="扇形配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="圆心坐标">
            <a-space>
              <a-input v-model="item.option.series[0].center[0]" />
              <a-input v-model="item.option.series[0].center[1]" />
            </a-space>
          </a-form-item>
          <a-form-item label="半径大小">
            <a-space>
              <a-input v-model="item.option.series[0].radius[0]" />
              <a-input v-model="item.option.series[0].radius[1]" />
            </a-space>
          </a-form-item>
          <a-form-item label="扇形图形">
            <a-radio-group v-model="item.option.series[0].roseType">
              <a-radio :style="{width: '100%', height: '35px', lineHeight: '35px'}" :value="false">
                <span style="word-break: break-all;white-space: pre-wrap;">正常扇形</span>
              </a-radio>
              <a-radio :style="{width: '100%', height: '70px', lineHeight: '35px'}" :value="'radius'">
                <span style="word-break: break-all;white-space: pre-wrap;">
                  扇区圆心角展现数据的百分比 半径展现数据的大小
                </span>
              </a-radio>
              <a-radio :style="{width: '100%', height: '70px', lineHeight: '35px'}" :value="'area'">
                <span style="word-break: break-all;white-space: pre-wrap;">
                  所有扇区圆心角相同 仅通过半径展现数据大小
                </span>
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="标签配置" header="标签配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="显示">
            <a-switch v-model="item.option.series[0].label.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <template v-if="item.option.series[0].label.show">
            <a-form-item label="位置">
              <a-select v-model="item.option.series[0].label.position">
                <a-select-option
                  v-for="labelPosition in labelPositionList"
                  :key="labelPosition.value"
                  :value="labelPosition.value"
                >
                  {{ labelPosition.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="视觉引导线">
              <a-switch v-model="item.option.series[0].labelLine.show" checked-children="显示" un-checked-children="不显示" />
            </a-form-item>
            <a-form-item v-if="item.option.series[0].labelLine.show" label="引导线长度">
              <a-row :gutter="20">
                <a-col :span="12">
                  <a-input-number v-model="item.option.series[0].labelLine.length" />
                </a-col>
                <a-col :span="12">
                  <a-input-number v-model="item.option.series[0].labelLine.length2" />
                </a-col>
              </a-row>
            </a-form-item>
          </template>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import { labelPositionList } from '@/components/DataView/common/common'

export default {
  name: 'PieNormalOption',
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
      labelPositionList
    }
  },
  methods: {
  }
}
</script>
