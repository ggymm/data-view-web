const NumberFlopConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '数字翻牌器',
    chartType: 'NumberFlop',
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
      padding: 20,
      align: 0,
      title: {
        show: true,
        text: '标题',
        position: 'column',
        margin: 10,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal'
      },
      number: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'arial',
        space: 1,
        digit: 0,
        decimal: 0,
        decimalSep: '.',
        thousandth: true,
        thousandthSep: ',',
        backgroundImage: ''
      },
      prefix: {
        show: false,
        text: '',
        right: 0,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: ''
      },
      suffix: {
        show: false,
        text: '',
        left: 0,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: ''
      }
    }
  }
}

const getNumberFlopConfig_1 = function() {
  return new NumberFlopConfig().config
}

export { getNumberFlopConfig_1 }
