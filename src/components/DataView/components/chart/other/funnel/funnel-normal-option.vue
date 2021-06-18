<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
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
import CommonOption from '@/components/DataView/common-option/option'
import CommonChartOption from '@/components/DataView/common-option/chart'
import CommonDataOption from '@/components/DataView/common-option/data'
import { labelPositionList } from '@/components/DataView/common-option/common'

export default {
  name: 'FunnelNormalOption',
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
      labelPositionList,
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
