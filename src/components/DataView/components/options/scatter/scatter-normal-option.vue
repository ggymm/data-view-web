<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
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
import CoordinateSystemOption from '../common/coordinate-system-option'
import CommonDataOption from '../common/common-data-option'

export default {
  name: 'ScatterNormalOption',
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
      ]
    }
  }
}
</script>
