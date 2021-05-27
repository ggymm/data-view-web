<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
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
import CommonPositionOption from '../common/common-position-option'
import CommonDataOption from '../common/common-data-option'

export default {
  name: 'MapChinaOption',
  components: {
    CommonChartOption,
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
          'label': '类目字段',
          'value': 'name'
        },
        {
          'label': '数值字段',
          'value': 'value'
        }
      ]
    }
  }
}
</script>
