const GaugeConfig = function() {
  this.config = {
    name: '',
    type: 'gauge',
    version: 1,
    show: 'true',
    choose: 'false',
    refresh: 'false',
    style: {
      x: 0,
      y: 0,
      width: 350,
      height: 250,
      rotate: 0
    },
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      sql: 'select name,value from gauge',
      name: 'name',
      value: 'value',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
    },
    data: [],
    interval: 8000,
    option: {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: {
        name: '',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [],
        title: {
          textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 20,
            color: '#fff',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 10
          }
        }
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getGaugeConfig_1 = function() {
  return new GaugeConfig().config
}

export { getGaugeConfig_1 }
