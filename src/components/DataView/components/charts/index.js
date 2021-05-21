import Vue from 'vue'

import PlotBubble from './plot/plot-bubble'
import PlotMap from './plot/plot-map'

import LineNormal from './line/line-normal'

import HistogramNormal from './histogram/histogram-normal'

import MapChina from './map/map-china'

import PieNormal from './pie/pie-normal'
import PieRing from './pie/pie-ring'
import PieRings from './pie/pie-rings'
import Pie2D from './pie/pie-2d'
import PiePercent from './pie/pie-percent'

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

Vue.component('PlotBubble', PlotBubble)
Vue.component('PlotMap', PlotMap)

Vue.component('LineNormal', LineNormal)

Vue.component('HistogramNormal', HistogramNormal)

Vue.component('MapChina', MapChina)

Vue.component('PieNormal', PieNormal)
Vue.component('PieRing', PieRing)
Vue.component('PieRings', PieRings)
Vue.component('Pie2D', Pie2D)
Vue.component('PiePercent', PiePercent)

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
  PlotBubble,
  PlotMap,

  LineNormal,

  HistogramNormal,

  MapChina,

  PieNormal,
  PieRing,
  PieRings,
  Pie2D,
  PiePercent,

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
