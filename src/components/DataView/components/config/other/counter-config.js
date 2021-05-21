const CounterConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartType: 'counter',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select data from counter',
      value: 'data'
    },
    data: [],
    interval: 8000,
    option: {
      fontColor: '#ffffff',
      fontSize: 16,
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

const getCounterConfig = function() {
  return new CounterConfig().config
}

export { getCounterConfig }
