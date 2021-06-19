<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-chart-option :item="item" />
        <coordinate-system-option :item="item" />
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="柱配置" header="柱配置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <div v-for="(s, i) in item.option.series" :key="i">
                <a-form-item :label="'类型-' + i">
                  <a-radio-group v-model="s.type">
                    <a-radio :style="{height: '35px', lineHeight: '35px'}" :value="'line'">
                      <span style="word-break: break-all;white-space: pre-wrap;">折线</span>
                    </a-radio>
                    <a-radio :style="{height: '35px', lineHeight: '35px'}" :value="'bar'">
                      <span style="word-break: break-all;white-space: pre-wrap;">柱形</span>
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label="'宽度-' + i">
                  <a-input v-model="s.barWidth" />
                </a-form-item>
                <a-form-item :label="'堆叠-' + i">
                  <a-input v-model="s.stack" />
                </a-form-item>
                <template v-if="s.itemStyle.borderRadius !== undefined">
                  <a-form-item :label="'圆角半径-' + i">
                    <a-row :gutter="20">
                      <a-col :span="12">
                        <a-input-number v-model="s.itemStyle.borderRadius[0]" :min="0" :precision="0" />
                      </a-col>
                      <a-col :span="12">
                        <a-input-number v-model="s.itemStyle.borderRadius[1]" :min="0" :precision="0" />
                      </a-col>
                    </a-row>
                    <a-row :gutter="20">
                      <a-col :span="12">
                        <a-input-number v-model="s.itemStyle.borderRadius[2]" :min="0" :precision="0" />
                      </a-col>
                      <a-col :span="12">
                        <a-input-number v-model="s.itemStyle.borderRadius[3]" :min="0" :precision="0" />
                      </a-col>
                    </a-row>
                  </a-form-item>
                </template>
                <a-form-item :label="'颜色配置-' + i">
                  <json-editor :height="'200px'" :json="s.itemStyle.color" @editor="itemColorChange($event, s)" />
                </a-form-item>
              </div>
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
import JsonEditor from '@/components/JsonEditor'
import CommonOption from '@/components/DataView/common-option/option'
import CommonChartOption from '@/components/DataView/common-option/chart'
import CoordinateSystemOption from '@/components/DataView/common-option/coordinate-system'
import CommonDataOption from '@/components/DataView/common-option/data'

export default {
  name: 'HistogramNormalOption',
  components: {
    JsonEditor,
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
