export const datasetTypes = [
  'LineNormal',
  'LineArea',

  'HistogramNormal',

  'PieNormal'
]

export const defaultSeriesMap = {
  'LineNormal': {
    type: 'line',
    lineStyle: {}
  },
  'LineArea': {
    type: 'line',
    lineStyle: {},
    areaStyle: {}
  },
  'HistogramNormal': {
    type: 'bar',
    lineStyle: {}
  },
  'PieNormal': {
    type: 'pie'
  }
}
