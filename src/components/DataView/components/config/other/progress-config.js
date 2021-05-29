const ProgressConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 50,
    chartType: 'Progress',
    lock: 'false',
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
      type: '',
      showInfo: true,
      strokeLinecap: 'round',
      strokeWidth: 15,
      strokeColor: '#5bc0de',
      width: 150,
      gapDegree: 30,
      gapPosition: 'bottom'
    }
  }
}

const getProgressConfig = function() {
  return new ProgressConfig().config
}

export { getProgressConfig }
