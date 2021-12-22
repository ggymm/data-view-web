const EarlyWarningConfig = function() {
  this.config = {
    name: '预警点滴',
    type: 'EarlyWarning',
    version: 1,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    style: {
      x: 0,
      y: 0,
      width: 200,
      height: 50,
      rotate: 0
    },
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      value: 'value',
      sql: 'select value from early_warning',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
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

const getEarlyWarningConfig_1 = function() {
  return new EarlyWarningConfig().config
}

export { getEarlyWarningConfig_1 }
