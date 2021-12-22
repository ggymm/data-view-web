const CounterConfig = function() {
  this.config = {
    name: '计数器',
    type: 'Counter',
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
      staticData: '{"value": 100}',
      database: '',
      value: 'data',
      sql: 'select data from counter',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
    },
    data: {
      value: 100
    },
    interval: 8000,
    option: {
      fontColor: '#ffffff',
      fontSize: 16,
      height: 50,
      fontWeight: 'normal',
      textAlign: 'center',
      thousandth: true,
      prefix: {
        title: '某某数据：',
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      },
      unit: {
        title: '单位',
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      }
    }
  }
}

const getCounterConfig_1 = function() {
  return new CounterConfig().config
}

export { getCounterConfig_1 }
