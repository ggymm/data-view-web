// ================================================== 图表 ==================================================
import { getScatterNormalConfig_1 } from './chart/scatter/normal/1/scatter-normal-config'

import { getLineNormalConfig_1 } from './chart/line/normal/1/line-normal-config'
import { getLineAreaConfig_1 } from './chart/line/area/1/line-area-config'

import { getHistogramNormalConfig_1 } from './chart/histogram/normal/1/histogram-normal-config'
import { getPictorialBarConfig_1 } from './chart/histogram/pictorial/1/pictorial-bar-config'

import { getMapChinaConfig_1 } from './chart/map/china/1/map-china-config'

import { getPieNormalConfig_1 } from './chart/pie/normal/1/pie-normal-config'

import { getRadarNormalConfig_1 } from './chart/radar/radar/1/radar-normal-config'

import { getWordCloudConfig_1 } from './chart/other/word-cloud/1/word-cloud-config'
import { getGaugeConfig_1 } from './chart/other/gauge/1/gauge-config'
import { getFunnelNormalConfig_1 } from './chart/other/funnel/1/funnel-normal-config'

// ================================================== 场景 ==================================================
import { getEarlyWarningConfig_1 } from './scene/operation/early-warning/1/early-warning-config'

// ================================================== 3D ==================================================
// ================================================== 其他 ==================================================
import { getTitleTextConfig_1 } from './other/auxiliary/title-text/1/title-text-config'
import { getImageChartConfig_1 } from './other/auxiliary/image/1/image-config'

import { getCarouselListConfig_1 } from './other/components/carousel-list/1/carousel-list-config'
import { getCarouselListConfig_2 } from './other/components/carousel-list/2/carousel-list-config'
import { getCounterConfig_1 } from './other/components/counter/1/counter-config'
import { getNumberFlopConfig_1 } from './other/components/number-flop/1/number-flop-config'
import { getProgressConfig_1 } from './other/components/progress/1/progress-config'

const OptionConfigMap = {
  'ScatterNormal_1': getScatterNormalConfig_1,

  'LineNormal_1': getLineNormalConfig_1,
  'LineArea_1': getLineAreaConfig_1,

  'HistogramNormal_1': getHistogramNormalConfig_1,
  'PictorialBar_1': getPictorialBarConfig_1,

  'MapChina_1': getMapChinaConfig_1,

  'PieNormal_1': getPieNormalConfig_1,

  'RadarNormal_1': getRadarNormalConfig_1,

  'wordCloud_1': getWordCloudConfig_1,
  'gauge_1': getGaugeConfig_1,
  'FunnelNormal_1': getFunnelNormalConfig_1,

  'EarlyWarning_1': getEarlyWarningConfig_1,

  'TitleText_1': getTitleTextConfig_1,
  'ImageChart_1': getImageChartConfig_1,

  'CarouselList_1': getCarouselListConfig_1,
  'CarouselList_2': getCarouselListConfig_2,
  'Counter_1': getCounterConfig_1,
  'NumberFlop_1': getNumberFlopConfig_1,
  'Progress_1': getProgressConfig_1
}

export default OptionConfigMap
