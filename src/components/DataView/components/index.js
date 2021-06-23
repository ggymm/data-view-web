import Vue from 'vue'

// ================================================== 图表 ==================================================
// 普通散点图
import ScatterNormal from './chart/scatter/normal/scatter-normal'
import ScatterNormalOption from './chart/scatter/normal/scatter-normal-option'

Vue.component('ScatterNormal', ScatterNormal)
Vue.component('ScatterNormalOption', ScatterNormalOption)

// 普通折线图
import LineNormal from './chart/line/normal/line-normal'
import LineNormalOption from './chart/line/normal/line-normal-option'

Vue.component('LineNormal', LineNormal)
Vue.component('LineNormalOption', LineNormalOption)

// 折线面积图
import LineArea from './chart/line/area/line-area'
import LineAreaOption from './chart/line/area/line-area-option'

Vue.component('LineArea', LineArea)
Vue.component('LineAreaOption', LineAreaOption)

// 普通柱状图
import HistogramNormal from './chart/histogram/normal/histogram-normal'
import HistogramNormalOption from './chart/histogram/normal/histogram-normal-option'

Vue.component('HistogramNormal', HistogramNormal)
Vue.component('HistogramNormalOption', HistogramNormalOption)

// 象形柱图
import PictorialBar from './chart/histogram/pictorial/pictorial-bar'
import PictorialBarOption from './chart/histogram/pictorial/pictorial-bar-option'

Vue.component('PictorialBar', PictorialBar)
Vue.component('PictorialBarOption', PictorialBarOption)

// 中国地图
import MapChina from './chart/map/china/map-china'
import MapChinaOption from './chart/map/china/map-china-option'

Vue.component('MapChina', MapChina)
Vue.component('MapChinaOption', MapChinaOption)

// 饼图
import PieNormal from './chart/pie/normal/pie-normal'
import PieNormalOption from './chart/pie/normal/pie-normal-option'

Vue.component('PieNormal', PieNormal)
Vue.component('PieNormalOption', PieNormalOption)

// 雷达图
import RadarNormal from './chart/radar/radar/radar-normal'
import RadarNormalOption from './chart/radar/radar/radar-normal-option'

Vue.component('RadarNormal', RadarNormal)
Vue.component('RadarNormalOption', RadarNormalOption)

// 热力图

// 词云
import WordCloud from './chart/other/word-cloud/word-cloud'
import WordCloudOption from './chart/other/word-cloud/word-cloud-option'

Vue.component('WordCloud', WordCloud)
Vue.component('WordCloudOption', WordCloudOption)

// 仪表盘
import Gauge from './chart/other/gauge/gauge'
import GaugeOption from './chart/other/gauge/gauge-option'

Vue.component('Gauge', Gauge)
Vue.component('GaugeOption', GaugeOption)

// 漏斗图
import FunnelNormal from './chart/other/funnel/funnel-normal'
import FunnelNormalOption from './chart/other/funnel/funnel-normal-option'

Vue.component('FunnelNormal', FunnelNormal)
Vue.component('FunnelNormalOption', FunnelNormalOption)

// ================================================== 场景 ==================================================
// 预警点滴
import EarlyWarning from './scene/operation/early-warning'
import EarlyWarningOption from './scene/operation/early-warning-option'

Vue.component('EarlyWarning', EarlyWarning)
Vue.component('EarlyWarningOption', EarlyWarningOption)

// ================================================== 3D ==================================================
// ================================================== 其他 ==================================================
// 轮播列表
import CarouselList from './other/carousel-list/carousel-list'
import CarouselListOption from './other/carousel-list/carousel-list-option'

Vue.component('CarouselList', CarouselList)
Vue.component('CarouselListOption', CarouselListOption)

// 计数器
import Counter from './other/counter/counter'
import CounterOption from './other/counter/counter-option'

Vue.component('Counter', Counter)
Vue.component('CounterOption', CounterOption)

// 数字翻牌器
import NumberFlop from './other/number-flop/number-flop'
import NumberFlopOption from './other/number-flop/number-flop-option'

Vue.component('NumberFlop', NumberFlop)
Vue.component('NumberFlopOption', NumberFlopOption)

// 标题文本
import TitleText from './other/title-text/title-text'
import TitleTextOption from './other/title-text/title-text-option'

Vue.component('TitleText', TitleText)
Vue.component('TitleTextOption', TitleTextOption)

// 进度条
import Progress from './other/progress/progress'
import ProgressOption from './other/progress/progress-option'

Vue.component('Progress', Progress)
Vue.component('ProgressOption', ProgressOption)

export {
  ScatterNormal,
  ScatterNormalOption,

  LineNormal,
  LineNormalOption,
  LineArea,
  LineAreaOption,

  HistogramNormal,
  HistogramNormalOption,
  PictorialBar,
  PictorialBarOption,

  MapChina,
  MapChinaOption,

  PieNormal,
  PieNormalOption,

  RadarNormal,
  RadarNormalOption,

  WordCloud,
  WordCloudOption,
  Gauge,
  GaugeOption,
  FunnelNormal,
  FunnelNormalOption,

  CarouselList,
  CarouselListOption,
  Counter,
  CounterOption,
  TitleText,
  TitleTextOption,
  Progress,
  ProgressOption
}
