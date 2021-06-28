const ProgressConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 50,
    chartName: '进度条',
    chartType: 'Progress',
    chartVersion: 1,
    rotate: 0,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      fileName: '',
      value: 'value',
      sql: 'select * from progress'
    },
    data: {},
    interval: 8000,
    option: {
      type: 'line',
      showInfo: true,
      info: {
        color: '#ffffff',
        fontSize: 20
      },
      strokeLinecap: 'round',
      strokeWidth: 10,
      strokeColor: '#5bc0de',
      width: 150,
      gapDegree: 0,
      gapPosition: 'bottom'
    }
  }
}

const getProgressConfig_1 = function() {
  return new ProgressConfig().config
}

export { getProgressConfig_1 }
