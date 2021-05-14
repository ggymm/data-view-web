const RadarBasicConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'radarBasic',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from radar',
      value: 'value',
      name: 'name',
      max: 'max',
      legend: 'legend'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '基础雷达图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {},
      legend: {
        show: true,
        orient: 'vertical',
        data: [],
        top: '0',
        left: '0',
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        indicator: [],
        shape: 'polygon',
        radius: 50
      },
      series: [{
        name: '',
        type: 'radar',
        areaStyle: { normal: { opacity: 0.4 }},
        data: []
      }],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      }
    }
  }
}

const getRadarBasicConfig = function() {
  return new RadarBasicConfig().config
}

export { getRadarBasicConfig }
