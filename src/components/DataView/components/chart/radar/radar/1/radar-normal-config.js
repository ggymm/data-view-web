const RadarNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '标准雷达图',
    chartType: 'RadarNormal',
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
      name: 'name',
      value: 'value',
      max: 'max',
      dimension: 'legend',
      sql: 'select * from radar'
    },
    data: {
      'data': [
        { 'name': '预算分配', 'value': ['4300', '1000', '2800', '3500', '5000', '1900'] },
        { 'name': '实际开销', 'value': ['5000', '1400', '2800', '3100', '4200', '2100'] }
      ],
      'indicator': [
        { 'max': '6500', 'name': '销售' },
        { 'max': '1600', 'name': '管理' },
        { 'max': '3000', 'name': '信息技术' },
        { 'max': '3800', 'name': '客服' },
        { 'max': '5200', 'name': '研发' },
        { 'max': '2500', 'name': '市场' }
      ]
    },
    interval: 8000,
    option: {
      title: {
        show: true,
        text: '标准雷达图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        show: true,
        textStyle: {
          color: '#ffffff'
        }
      },
      radar: {
        indicator: [],
        center: ['50%', '50%'],
        radius: [0, '70%'],
        axisLine: {
          show: true,
          lineStyle: {}
        },
        axisLabel: {
          show: true
        },
        axisTick: {
          show: true,
          lineStyle: {}
        },
        splitLine: {
          show: true,
          lineStyle: {}
        },
        splitArea: {
          show: true,
          areaStyle: {}
        }
      },
      series: [
        {
          type: 'radar',
          itemStyle: {},
          lineStyle: {},
          data: []
        }
      ]
    }
  }
}

const getRadarNormalConfig_1 = function() {
  return new RadarNormalConfig().config
}

export { getRadarNormalConfig_1 }
