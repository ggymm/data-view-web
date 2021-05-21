import Vue from 'vue'

import PlotBubbleOption from './plot/plot-bubble-option'
import PlotMapOption from './plot/plot-map-option'

import LineNormalOption from './line/line-normal-option'
import LineCoordinateOption from './line/line-coordinate-option'

import HistogramNormalOption from './histogram/histogram-normal-option'

import MapChinaOption from './map/map-china-option'
import MapWorldOption from './map/map-world-option'
import MapProvinceOption from './map/map-province-option'

import PieNormalOption from './pie/pie-normal-option'
import PieRingOption from './pie/pie-ring-option'
import Pie2DOption from './pie/pie-2d-option'
import PiePercentOption from './pie/pie-percent-option'
import PieRingsOption from './pie/pie-rings-option'

import RadarBasicOption from './radar/radar-basic-option'

import HeatBasicOption from './heat/heat-basic-option'
import HeatProvinceOption from './heat/heat-province-option'
import HeatMapOption from './heat/heat-map-option'
import HeatMapLargePiecewiseOption from './heat/heat-map-large-piecewise-option'

import RelationOneOption from './relation/relation-one-option'
import RelationTwoOption from './relation/relation-two-option'
import RelationThreeOption from './relation/relation-three-option'
import RelationFourOption from './relation/relation-four-option'
import RelationFiveOption from './relation/relation-five-option'

import WordCloudOption from './other/word-cloud-option'
import RotationListOption from './other/rotation-list-option'
import CounterOption from './other/counter-option'
import TitleTextOption from './other/title-text-option'
import ProgressBarOption from './other/progress-bar-option'
import PictureOption from './other/picture-option'
import GaugeOption from './other/gauge-option'

Vue.component('PlotBubbleOption', PlotBubbleOption)
Vue.component('PlotMapOption', PlotMapOption)

Vue.component('LineNormalOption', LineNormalOption)

Vue.component('HistogramNormalOption', HistogramNormalOption)

Vue.component('MapChinaOption', MapChinaOption)
Vue.component('MapWorldOption', MapWorldOption)
Vue.component('MapProvinceOption', MapProvinceOption)

Vue.component('PieNormalOption', PieNormalOption)
Vue.component('PieRingOption', PieRingOption)
Vue.component('PieRingsOption', PieRingsOption)
Vue.component('Pie2DOption', Pie2DOption)
Vue.component('PiePercentOption', PiePercentOption)

Vue.component('RadarBasicOption', RadarBasicOption)

Vue.component('HeatBasicOption', HeatBasicOption)
Vue.component('HeatProvinceOption', HeatProvinceOption)
Vue.component('HeatMapOption', HeatMapOption)
Vue.component('HeatMapLargePiecewiseOption', HeatMapLargePiecewiseOption)

Vue.component('RelationOneOption', RelationOneOption)
Vue.component('RelationTwoOption', RelationTwoOption)
Vue.component('RelationThreeOption', RelationThreeOption)
Vue.component('RelationFourOption', RelationFourOption)
Vue.component('RelationFiveOption', RelationFiveOption)

Vue.component('WordCloudOption', WordCloudOption)
Vue.component('RotationListOption', RotationListOption)
Vue.component('CounterOption', CounterOption)
Vue.component('TitleTextOption', TitleTextOption)
Vue.component('ProgressBarOption', ProgressBarOption)
Vue.component('PictureOption', PictureOption)
Vue.component('GaugeOption', GaugeOption)

export {
  PlotBubbleOption,
  PlotMapOption,

  LineNormalOption,
  LineCoordinateOption,

  HistogramNormalOption,

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
}
