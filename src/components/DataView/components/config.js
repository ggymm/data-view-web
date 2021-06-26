// ================================================== 图表 ==================================================
import { getScatterNormalConfig } from './chart/scatter/normal/scatter-normal-config'

import { getLineNormalConfig } from './chart/line/normal/line-normal-config'
import { getLineAreaConfig } from './chart/line/area/line-area-config'

import { getHistogramNormalConfig } from './chart/histogram/normal/histogram-normal-config'
import { getPictorialBarConfig } from './chart/histogram/pictorial/pictorial-bar-config'

import { getMapChinaConfig } from './chart/map/china/map-china-config'

import { getPieNormalConfig } from './chart/pie/normal/pie-normal-config'

import { getRadarNormalConfig } from './chart/radar/radar/radar-normal-config'

import { getWordCloudConfig } from './chart/other/word-cloud/word-cloud-config'
import { getGaugeConfig } from './chart/other/gauge/gauge-config'
import { getFunnelNormalConfig } from './chart/other/funnel/funnel-normal-config'

// ================================================== 场景 ==================================================
import { getEarlyWarningConfig } from './scene/operation/early-warning-config'

// ================================================== 3D ==================================================
// ================================================== 其他 ==================================================
import { getTitleTextConfig } from './other/auxiliary/title-text/title-text-config'
import { getImageChartConfig } from './other/auxiliary/image/image-config'

import { getCarouselListConfig } from './other/components/carousel-list/carousel-list-config'
import { getCounterConfig } from './other/components/counter/counter-config'
import { getNumberFlopConfig } from './other/components/number-flop/number-flop-config'
import { getProgressConfig } from './other/components/progress/progress-config'

const OptionConfigMap = {
  'ScatterNormal': getScatterNormalConfig,

  'LineNormal': getLineNormalConfig,
  'LineArea': getLineAreaConfig,

  'HistogramNormal': getHistogramNormalConfig,
  'PictorialBar': getPictorialBarConfig,

  'MapChina': getMapChinaConfig,

  'PieNormal': getPieNormalConfig,

  'RadarNormal': getRadarNormalConfig,

  'wordCloud': getWordCloudConfig,
  'gauge': getGaugeConfig,
  'FunnelNormal': getFunnelNormalConfig,

  'EarlyWarning': getEarlyWarningConfig,

  'TitleText': getTitleTextConfig,
  'ImageChart': getImageChartConfig,

  'CarouselList': getCarouselListConfig,
  'Counter': getCounterConfig,
  'NumberFlop': getNumberFlopConfig,
  'Progress': getProgressConfig
}

export default OptionConfigMap
