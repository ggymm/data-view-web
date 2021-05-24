<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="折线设置" header="折线设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="是否平滑">
                <a-space>
                  <a-switch
                    v-for="series in item.option.series"
                    :key="series.name"
                    v-model="series.smooth"
                    checked-children="平滑"
                    un-checked-children="不平滑"
                  />
                </a-space>
              </a-form-item>
              <a-form-item label="是否显示符号">
                <a-space>
                  <a-switch
                    v-for="series in item.option.series"
                    :key="series.name"
                    v-model="series.showSymbol"
                    checked-children="显示"
                    un-checked-children="不显示"
                  />
                </a-space>
              </a-form-item>
              <a-form-item label="折线类型">
                <a-select
                  v-for="series in item.option.series"
                  :key="series.name"
                  v-model="series.lineStyle.type"
                >
                  <a-select-option
                    v-for="lineType in lineTypeList"
                    :key="lineType.value"
                    :value="lineType.value"
                  >
                    {{ lineType.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="区域配置">
                <template v-for="(series, index) in item.option.series">
                  <a-switch
                    :key="index"
                    checked-children="显示"
                    un-checked-children="不显示"
                    @change="changeArea(index)"
                  />
                  <a-input
                    v-if="series.areaStyle !== undefined"
                    :key="index"
                    v-model="series.areaStyle.color"
                    type="color"
                  />
                </template>
              </a-form-item>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="position" tab="位置">
        <common-position-option :item="item" />
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
import CommonChartOption from '../common/common-chart-option'
import CoordinateSystemOption from '../common/coordinate-system-option'
import CommonPositionOption from '../common/common-position-option'
import CommonDataOption from '../common/common-data-option'
import { lineTypeList } from '../common'

export default {
  name: 'LineAreaOption',
  components: {
    CommonChartOption,
    CoordinateSystemOption,
    CommonPositionOption,
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
