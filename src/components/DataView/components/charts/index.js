import Vue from 'vue'

import ScatterNormal from './scatter/scatter-normal'
import PlotMap from './scatter/plot-map'

import LineNormal from './line/line-normal'
import LineArea from './line/line-area'

import HistogramNormal from './histogram/histogram-normal'

import MapChina from './map/map-china'

import PieNormal from './pie/pie-normal'

import RadarBasic from './radar/radar-basic'

import HeatBasic from './heat/heat-basic'

import RelationOne from './relation/relation-one'
import RelationTwo from './relation/relation-two'
import RelationThree from './relation/relation-three'
import RelationFour from './relation/relation-four'
import RelationFive from './relation/relation-five'

import WordCloud from './other/word-cloud'
import RotationList from './other/rotation-list'
import Counter from './other/counter'
import TitleText from './other/title-text'
import ProgressBar from './other/progress-bar'
import PictureV from './other/picture'
import Gauge from './other/gauge'

Vue.component('ScatterNormal', ScatterNormal)
Vue.component('PlotMap', PlotMap)

Vue.component('LineNormal', LineNormal)
Vue.component('LineArea', LineArea)

Vue.component('HistogramNormal', HistogramNormal)

Vue.component('MapChina', MapChina)

Vue.component('PieNormal', PieNormal)

Vue.component('RadarBasic', RadarBasic)

Vue.component('HeatBasic', HeatBasic)

Vue.component('RelationOne', RelationOne)
Vue.component('RelationTwo', RelationTwo)
Vue.component('RelationThree', RelationThree)
Vue.component('RelationFour', RelationFour)
Vue.component('RelationFive', RelationFive)

Vue.component('WordCloud', WordCloud)
Vue.component('RotationList', RotationList)
Vue.component('Counter', Counter)
Vue.component('TitleText', TitleText)
Vue.component('ProgressBar', ProgressBar)
Vue.component('PictureV', PictureV)
Vue.component('Gauge', Gauge)

export {
  ScatterNormal,
  PlotMap,

  LineNormal,
  LineArea,

  HistogramNormal,

  MapChina,

  PieNormal,

  RadarBasic,

  HeatBasic,

  RelationOne,
  RelationTwo,
  RelationThree,
  RelationFour,
  RelationFive,

  WordCloud,
  RotationList,
  Counter,
  TitleText,
  ProgressBar,
  PictureV,
  Gauge
}
