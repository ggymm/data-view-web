<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option two">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-option :item="item" />
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="折线设置" header="折线设置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <template v-for="(s, index) in item.option.series">
                <a-form-item :key="'是否平滑' + index" :label="'是否平滑' + index">
                  <input v-model="s.smooth">
                </a-form-item>
                <a-form-item :key="'是否显示折点' + index" :label="'是否显示折点' + index">
                  <a-switch
                    v-model="s.showSymbol"
                    checked-children="显示"
                    un-checked-children="不显示"
                  />
                </a-form-item>
                <a-form-item :key="'折线类型' + index" :label="'折线类型' + index">
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
              </template>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
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
import CoordinateSystemOption from '../common/coordinate-system-option'
import CommonDataOption from '../common/common-data-option'
import { lineTypeList } from '../common'

export default {
  name: 'LineNormalOption',
  components: {
    CommonOption,
    CommonChartOption,
    CoordinateSystemOption,
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
      fileNameList: [],
      params: [
        {
          'label': '分类字段',
          'value': 'dimension'
        },
        {
          'label': 'x轴字段',
          'value': 'name'
        },
        {
          'label': 'y轴字段',
          'value': 'value'
        }
      ],
      lineTypeList
    }
  }
}
</script>
