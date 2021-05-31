import Vue from 'vue'

import ScatterNormal from './scatter/scatter-normal'
import PlotMap from './scatter/plot-map'

import LineNormal from './line/line-normal'
import LineArea from './line/line-area'

import HistogramNormal from './histogram/histogram-normal'
import PictorialBar from './histogram/pictorial-bar'

import MapChina from './map/map-china'

import PieNormal from './pie/pie-normal'

import RadarNormal from './radar/radar-normal'

import HeatBasic from './heat/heat-basic'

import RelationOne from './relation/relation-one'
import RelationTwo from './relation/relation-two'
import RelationThree from './relation/relation-three'
import RelationFour from './relation/relation-four'
import RelationFive from './relation/relation-five'

import WordCloud from './other/word-cloud'
import CarouselList from './other/carousel-list'
import Counter from './other/counter'
import TitleText from './other/title-text'
import Progress from './other/progress'
import PictureV from './other/picture'
import Gauge from './other/gauge'

Vue.component('ScatterNormal', ScatterNormal)
Vue.component('PlotMap', PlotMap)

Vue.component('LineNormal', LineNormal)
Vue.component('LineArea', LineArea)

Vue.component('HistogramNormal', HistogramNormal)
Vue.component('PictorialBar', PictorialBar)

Vue.component('MapChina', MapChina)

Vue.component('PieNormal', PieNormal)

Vue.component('RadarNormal', RadarNormal)

Vue.component('HeatBasic', HeatBasic)

Vue.component('RelationOne', RelationOne)
Vue.component('RelationTwo', RelationTwo)
Vue.component('RelationThree', RelationThree)
Vue.component('RelationFour', RelationFour)
Vue.component('RelationFive', RelationFive)

Vue.component('WordCloud', WordCloud)
Vue.component('CarouselList', CarouselList)
Vue.component('Counter', Counter)
Vue.component('TitleText', TitleText)
Vue.component('Progress', Progress)
Vue.component('PictureV', PictureV)
Vue.component('Gauge', Gauge)

export {
  ScatterNormal,
  PlotMap,

  LineNormal,
  LineArea,

  HistogramNormal,
  PictorialBar,

  MapChina,

  PieNormal,

  RadarNormal,

  HeatBasic,

  RelationOne,
  RelationTwo,
  RelationThree,
  RelationFour,
  RelationFive,

  WordCloud,
  CarouselList,
  Counter,
  TitleText,
  Progress,
  PictureV,
  Gauge
}
