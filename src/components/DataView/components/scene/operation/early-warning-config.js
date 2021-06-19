const EarlyWarningConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '预警点滴',
    chartType: 'EarlyWarning',
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
      status: 'status',
      sql: 'select status from early_warning'
    },
    data: [],
    interval: 8000,
    option: {
      radius: 16,
      boundary: 32,
      spread: 1,
      series: []
    }
  }
}

const getEarlyWarningConfig = function() {
  return new EarlyWarningConfig().config
}

export { getEarlyWarningConfig }
