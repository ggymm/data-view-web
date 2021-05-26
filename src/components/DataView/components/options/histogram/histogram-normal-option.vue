<template>
  <div class="data-view-chart-option three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="柱配置" header="柱配置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <div v-for="(s, i) in item.option.series" :key="i">
                <a-form-item :label="'柱形宽度-' + i">
                  <a-input v-model="s.barWidth" />
                </a-form-item>
                <a-form-item :label="'颜色配置-' + i">
                  <json-editor :json="s.itemStyle.color" @editor="itemColorChange($event, s)" />
                </a-form-item>
              </div>
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
import JsonEditor from '@/components/JsonEditor'
import CommonChartOption from '../common/common-chart-option'
import CoordinateSystemOption from '../common/coordinate-system-option'
import CommonPositionOption from '../common/common-position-option'
import CommonDataOption from '../common/common-data-option'

export default {
  name: 'HistogramNormalOption',
  components: {
    JsonEditor,
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
  },
  methods: {
    itemColorChange(style, s) {
      s.itemStyle.color = style
    }
  }
}
</script>
