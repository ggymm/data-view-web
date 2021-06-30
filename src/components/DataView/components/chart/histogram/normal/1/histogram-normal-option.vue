<template>
  <div>
    <chart-option :item="item" />
    <coordinate-system-option :item="item" />
    <a-collapse :bordered="false">
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
              <a-textarea v-model="s.itemStyle.color" :rows="4" />
            </a-form-item>
          </div>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import CoordinateSystemOption from '@/components/DataView/common/option/coordinate-system'

export default {
  name: 'HistogramNormalOption',
  components: {
    ChartOption,
    CoordinateSystemOption
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    itemColorChange(style, s) {
      s.itemStyle.color = style
    }
  }
}
</script>
