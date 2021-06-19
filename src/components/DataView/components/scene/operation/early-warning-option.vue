<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="状态样式" header="状态样式">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="颜色">
                <a-input v-model="item.option.fontColor" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="状态列表" header="状态列表">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="内容">
                <a-input v-model="item.option.prefix.title" />
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
import CommonOption from '@/components/DataView/common-option/option'
import CommonDataOption from '@/components/DataView/common-option/data'

export default {
  name: 'EarlyWarningOption',
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
          'label': '状态字段',
          'value': 'value'
        }
      ]
    }
  }
}
</script>
