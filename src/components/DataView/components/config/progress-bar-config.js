const ProgressBarConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 18,
    chartType: 'progressBar',
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
    data: {},
    interval: 8000,
    option: {
      showText: false,
      strokeWidth: 15,
      barColor: '#5bc0de',
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getProgressBarConfig = function() {
  return new ProgressBarConfig().config
}

export { getProgressBarConfig }
