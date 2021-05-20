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

<style lang="less">
.data-view-chart-option {
  &.one {
    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab-active {
        color: rgba(0, 0, 0, 0.65);
      }

      .ant-tabs-tab {
        width: 100%;
        margin: 0;
        text-align: center;
      }
    }
  }

  &.two {
    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab {
        width: 50%;
        margin: 0;
        text-align: center;
      }
    }
  }

  .ant-tabs-bar {
    margin: 0;
  }

  .ant-form {
    padding: 20px;
  }

  .ant-collapse-content-box {
    padding: 0;
  }

  .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content {
    background-color: #ffffff;
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border: none;
  }

  .ant-collapse > .ant-collapse-item {
    border: none;
  }

  .ant-collapse-header {
    background-color: #f2f2f2;
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>
