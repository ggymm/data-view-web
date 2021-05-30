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
        axisLine: {},
        axisLabel: {},
        axisTick: {},
        splitLine: {},
        splitArea: {}
      },
      series: [
        {
          type: 'radar',
          itemStyle: {},
          lineStyle: {},
          areaStyle: {},
          data: []
        }
      ]
    }
  }
}

const getRadarBasicConfig = function() {
  return new RadarBasicConfig().config
}

export { getRadarBasicConfig }
