<template>
  <div>
    <chart-option :item="item" />
    <coordinate-system-option :item="item" />
    <a-collapse :bordered="false">
      <a-collapse-panel key="柱配置" header="柱配置">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <div v-for="(s, i) in item.option.series" :key="i">
            <a-form-item :label="'柱间距离-' + i">
              <a-input v-model="s.barCategoryGap" />
            </a-form-item>
            <a-form-item :label="'柱形状-' + i">
              <a-input v-model="s.symbol" />
            </a-form-item>
            <a-form-item :label="'透明度-' + i">
              <a-input-number v-model="s.itemStyle.opacity" :min="0" :max="1" :precision="1" />
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
  name: 'PictorialBarOption',
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
  }
}
</script>
