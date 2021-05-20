import {
  getPlotBubbleConfig,
  getPlotMapConfig,

  getLineNormalConfig,
  getLineCoordinateConfig,

  getHistogramGradientConfig,
  getHistogramGradientHorizontalConfig,
  getHistogramStackingConfig,
  getHistogramComplexConfig,

  getMapChinaConfig,
  getMapWorldConfig,
  getMapProvinceConfig,

  getPieNormalConfig,
  getPieRingConfig,
  getPie2DConfig,
  getPiePercentConfig,
  getPieRingsConfig,

  getRadarBasicConfig,

  getHeatBasicConfig,
  getHeatProvinceConfig,
  getHeatMapConfig,
  getHeatMapLargePiecewiseConfig,

  getRelationOneConfig,
  getRelationTwoConfig,
  getRelationThreeConfig,
  getRelationFourConfig,
  getRelationFiveConfig,

  getWordCloudConfig,
  getRotationListConfig,
  getCounterConfig,
  getTitleTextConfig,
  getProgressBarConfig,
  getPictureConfig,
  getGaugeConfig
} from '../components/config'

const OptionConfigMap = {
  'plotBubble': getPlotBubbleConfig,
  'plotMap': getPlotMapConfig,

  'lineNormal': getLineNormalConfig,
  'lineCoordinate': getLineCoordinateConfig,

  'histogramGradient': getHistogramGradientConfig,
  'histogramGradientHorizontal': getHistogramGradientHorizontalConfig,
  'histogramStacking': getHistogramStackingConfig,
  'histogramComplex': getHistogramComplexConfig,

  'mapChina': getMapChinaConfig,
  'mapWorld': getMapWorldConfig,
  'mapProvince': getMapProvinceConfig,

  'pieNormal': getPieNormalConfig,
  'pieRing': getPieRingConfig,
  'pie2D': getPie2DConfig,
  'piePercent': getPiePercentConfig,
  'pieRings': getPieRingsConfig,

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
  'rotationList': getRotationListConfig,
  'counter': getCounterConfig,
  'titleText': getTitleTextConfig,
  'progressBar': getProgressBarConfig,
  'picture': getPictureConfig,
  'gauge': getGaugeConfig
}

export default OptionConfigMap

