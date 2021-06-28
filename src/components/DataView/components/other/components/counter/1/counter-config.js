const CounterConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '计数器',
    chartType: 'Counter',
    chartVersion: 1,
    rotate: 0,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      staticData: '{"value": 100}',
      database: '',
      fileName: '',
      value: 'data',
      sql: 'select data from counter'
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
