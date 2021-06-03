<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
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
      </a-tab-pane>
      <a-tab-pane key="common" tab="通用">
        <common-option :item="item" />
      </a-tab-pane>
      <a-tab-pane key="data" tab="数据">
        <common-data-option
          :item="item"
          :data-source-list="dataSourceList"
          :params="params"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonOption from '../common/common-option'
import CommonChartOption from '../common/common-chart-option'
import CommonDataOption from '../common/common-data-option'
import { symbolTypeList } from '../common'

export default {
  name: 'RadarNormalOption',
  components: {
    CommonOption,
    CommonChartOption,
    CommonDataOption
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      symbolTypeList,
      fileNameList: [],
      params: [
        {
          'label': '分类字段',
          'value': 'dimension'
        },
        {
          'label': '最大值',
          'value': 'max'
        },
        {
          'label': '数据字段',
          'value': 'name'
        },
        {
          'label': '值字段',
          'value': 'value'
        }
      ]
    }
  }
}
</script>
