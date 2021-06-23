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
      value: 'value',
      sql: 'select value from early_warning'
    },
    data: {
      value: '0'
    },
    interval: 8000,
    option: {
      radius: 16,
      boundary: 32,
      spread: 1,
      symbolSize: 18,
      series: [
        {
          code: '0',
          codeColor: '#00E6B6',
          label: '',
          labelColor: '',
          alert: false,
          symbol: '√'
        },
        {
          code: '1',
          codeColor: '#EF5350',
          label: '',
          labelColor: '',
          alert: true,
          symbol: '✕'
        },
        {
          code: '2',
          codeColor: '#FFFF00',
          label: '',
          labelColor: '',
          alert: true,
          symbol: '!'
        }
      ]
    }
  }
}

const getEarlyWarningConfig = function() {
  return new EarlyWarningConfig().config
}

export { getEarlyWarningConfig }
