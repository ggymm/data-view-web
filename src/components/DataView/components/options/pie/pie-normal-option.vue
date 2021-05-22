<template>
  <div class="data-view-chart-option two">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-option :item="item" />
        <common-chart-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="折线设置" header="折线设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
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
import CommonDataOption from '../common/common-data-option'

export default {
  name: 'PieNormalOption',
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
      fileNameList: [],
      params: [
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
  },
  methods: {
  }
}
</script>
