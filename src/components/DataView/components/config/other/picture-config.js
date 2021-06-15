const PictureConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '',
    chartType: 'picture',
    lock: 'false',
    rotate: 0,
    show: 'true',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: '',
      x: '',
      name: ''
    },
    data: [],
    interval: 8000,
    option: {}
  }
}

const getPictureConfig = function() {
  return new PictureConfig().config
}

export { getPictureConfig }
