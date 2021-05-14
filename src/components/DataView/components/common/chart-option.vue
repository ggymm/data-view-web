<template>
  <div>
    <component
      :is="OptionComponentMap[item.chartType]"
      :item="item"
      :data-source-list="dataSourceList"
      @handleDeleteItem="handleDeleteItem"
      @handleEditOption="handleEditOption"
      @handleEditSql="handleEditSql"
    />
  </div>
</template>

<script>
import {
  PlotBubbleOption,
  PlotMapOption,

  LineNormalOption,
  LineCoordinateOption,
  LineStackingOption,
  LineStackingAreaOption,

  HistogramGradientOption,
  HistogramGradientHorizontalOption,
  HistogramStackingOption,
  HistogramComplexOption,

  MapChinaOption,
  MapWorldOption,
  MapProvinceOption,

  PieNormalOption,
  PieRingOption,
  Pie2DOption,
  PiePercentOption,
  PieRingsOption,

  RadarBasicOption,

  HeatBasicOption,
  HeatProvinceOption,
  HeatMapOption,
  HeatMapLargePiecewiseOption,

  RelationOneOption,
  RelationTwoOption,
  RelationThreeOption,
  RelationFourOption,
  RelationFiveOption,

  WordCloudOption,
  RotationListOption,
  CounterOption,
  TitleTextOption,
  ProgressBarOption,
  PictureOption,
  GaugeOption
} from '../options'

import OptionComponentMap from '../../config/option-component-map'

export default {
  name: 'ChartOption',
  components: {
    PlotBubbleOption,
    PlotMapOption,

    LineNormalOption,
    LineCoordinateOption,
    LineStackingOption,
    LineStackingAreaOption,

    HistogramGradientOption,
    HistogramGradientHorizontalOption,
    HistogramStackingOption,
    HistogramComplexOption,

    MapChinaOption,
    MapWorldOption,
    MapProvinceOption,

    PieNormalOption,
    PieRingOption,
    Pie2DOption,
    PiePercentOption,
    PieRingsOption,

    RadarBasicOption,

    HeatBasicOption,
    HeatProvinceOption,
    HeatMapOption,
    HeatMapLargePiecewiseOption,

    RelationOneOption,
    RelationTwoOption,
    RelationThreeOption,
    RelationFourOption,
    RelationFiveOption,

    WordCloudOption,
    RotationListOption,
    CounterOption,
    TitleTextOption,
    ProgressBarOption,
    PictureOption,
    GaugeOption
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
      OptionComponentMap
    }
  },
  mounted() {
  },
  methods: {
    handleDeleteItem(item) {
      this.$emit('handleDeleteItem', item)
    },
    handleEditOption(option) {
    },
    changeOption() {
    },
    handleEditSql(sql) {
    }
  }
}
</script>

<style>

</style>
