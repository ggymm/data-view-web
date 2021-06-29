<template>
  <div :class="[showData() ? 'three' : 'two']">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <component
          :is="currentItem.chartType + 'Option_' + currentItem.chartVersion"
          :item="currentItem"
        />
      </a-tab-pane>
      <a-tab-pane key="common" tab="通用">
        <common-option :item="currentItem" />
      </a-tab-pane>
      <a-tab-pane v-if="showData()" key="data" tab="数据">
        <common-data-option
          :item="currentItem"
          :data-source-list="dataSourceList"
          :params="paramsMap[currentItem.chartType + '_' + currentItem.chartVersion]"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '../components/index'
import CommonOption from '../common-option/option'
import CommonDataOption from '../common-option/data'

const coordinateSystemParams = [
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

const keyValueParams = [
  {
    'label': '数据字段',
    'value': 'name'
  },
  {
    'label': '值字段',
    'value': 'value'
  }
]

const valueParams = [
  {
    'label': '数据字段',
    'value': 'value'
  }
]

const paramsMap = {
  'ScatterNormal_1': coordinateSystemParams,
  'LineNormal_1': coordinateSystemParams,
  'LineArea_1': coordinateSystemParams,
  'HistogramNormal_1': coordinateSystemParams,
  'PictorialBar_1': coordinateSystemParams,
  'MapChina_1': keyValueParams,
  'PieNormal_1': keyValueParams,
  'RadarNormal_1': [
    {
      'label': '分类字段',
      'value': 'dimension'
    },
    {
      'label': '最大值',
      'value': 'max'
    },
    {
      'label': '数据字段',
      'value': 'name'
    },
    {
      'label': '值字段',
      'value': 'value'
    }
  ],
  'wordCloud_1': [],
  'gauge_1': [],
  'FunnelNormal_1': [],
  'EarlyWarning_1': valueParams,
  'TitleText_1': null,
  'ImageChart_1': null,
  'CarouselList_1': [],
  'CarouselList_2': [],
  'Counter_1': valueParams,
  'NumberFlop_1': valueParams,
  'Progress_1': valueParams
}

export default {
  name: 'ChartOption',
  components: {
    CommonOption,
    CommonDataOption
  },
  props: {
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      paramsMap
    }
  },
  computed: mapState([
    'currentItem'
  ]),
  mounted() {
  },
  methods: {
    showData() {
      return paramsMap[`${this.currentItem.chartType}_${this.currentItem.chartVersion}`] !== null
    }
  }
}
</script>
