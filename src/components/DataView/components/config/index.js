import { getScatterNormalConfig } from './scatter/scatter-normal-config'
import { getPlotMapConfig } from './scatter/plot-map-config'

import { getLineNormalConfig } from './line/line-normal-config'
import { getLineAreaConfig } from './line/line-area-config'
import { getLineCoordinateConfig } from './line/line-coordinate-config'

import { getHistogramNormalConfig } from './histogram/histogram-normal-config'

import { getMapChinaConfig } from './map/map-china-config'
import { getMapWorldConfig } from './map/map-world-config'
import { getMapProvinceConfig } from './map/map-province-config'

import { getPieNormalConfig } from './pie/pie-normal-config'

import { getRadarBasicConfig } from './radar/radar-basic-config'

import { getHeatBasicConfig } from './heat/heat-basic-config'
import { getHeatProvinceConfig } from './heat/heat-province-config'
import { getHeatMapConfig } from './heat/heat-map-config'
import { getHeatMapLargePiecewiseConfig } from './heat/heat-map-large-piecewise-config'

import { getRelationOneConfig } from './relation/relation-one-config'
import { getRelationTwoConfig } from './relation/relation-two-config'
import { getRelationThreeConfig } from './relation/relation-three-config'
import { getRelationFourConfig } from './relation/relation-four-config'
import { getRelationFiveConfig } from './relation/relation-five-config'

import { getWordCloudConfig } from './other/word-cloud-config'
import { getCarouselListConfig } from './other/carousel-list-config'
import { getCounterConfig } from './other/counter-config'
import { getTitleTextConfig } from './other/title-text-config'
import { getProgressBarConfig } from './other/progress-bar-config'
import { getPictureConfig } from './other/picture-config'
import { getGaugeConfig } from './other/gauge-config'

const OptionConfigMap = {
  'ScatterNormal': getScatterNormalConfig,
  'plotMap': getPlotMapConfig,

  'LineNormal': getLineNormalConfig,
  'LineArea': getLineAreaConfig,
  'lineCoordinate': getLineCoordinateConfig,

  'HistogramNormal': getHistogramNormalConfig,

  'MapChina': getMapChinaConfig,
  'mapWorld': getMapWorldConfig,
  'mapProvince': getMapProvinceConfig,

  'PieNormal': getPieNormalConfig,

  'radarBasic': getRadarBasicConfig,

  'heatBasic': getHeatBasicConfig,
  'heatProvince': getHeatProvinceConfig,
  'heatMap': getHeatMapConfig,
  'heatMapLargePiecewise': getHeatMapLargePiecewiseConfig,

  'relationOne': getRelationOneConfig,
  'relationTwo': getRelationTwoConfig,
  'relationThree': getRelationThreeConfig,
  'relationFour': getRelationFourConfig,
  'relationFive': getRelationFiveConfig,

  'wordCloud': getWordCloudConfig,
  'CarouselList': getCarouselListConfig,
  'Counter': getCounterConfig,
  'TitleText': getTitleTextConfig,
  'progressBar': getProgressBarConfig,
  'picture': getPictureConfig,
  'gauge': getGaugeConfig
}

export default OptionConfigMap
