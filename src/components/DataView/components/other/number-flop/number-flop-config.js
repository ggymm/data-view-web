const NumberFlopConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '数字翻牌器',
    chartType: 'NumberFlop',
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
      padding: 20,
      align: 0,
      title: {
        show: true,
        text: '标题',
        position: 'column',
        margin: 10,
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      },
      number: {
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'arial',
        space: 1,
        digit: 0,
        decimal: 0,
        decimalSep: '.',
        thousandth: true,
        thousandthSep: ','
      },
      prefix: {
        show: false,
        text: '某某数据：',
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      },
      suffix: {
        show: false,
        text: '单位',
        fontColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      }
    }
  }
}

const getNumberFlopConfig = function() {
  return new NumberFlopConfig().config
}

export { getNumberFlopConfig }
