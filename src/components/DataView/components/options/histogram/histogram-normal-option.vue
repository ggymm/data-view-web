<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="柱设置" header="柱设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
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

export default {
  name: 'HistogramNormalOption',
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
      ]
    }
  }
}
</script>
