<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="进度条配置" header="进度条配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              进度条配置
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
import CommonDataOption from '../common/common-data-option'

export default {
  name: 'ProgressOption',
  components: {
    CommonOption,
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
          'label': '数据字段',
          'value': 'value'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
