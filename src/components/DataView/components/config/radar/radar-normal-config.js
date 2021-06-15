const RadarNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '',
    chartType: 'RadarNormal',
    rotate: 0,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      name: 'name',
      value: 'value',
      max: 'max',
      dimension: 'legend',
      sql: 'select * from radar'
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

const getRadarNormalConfig = function() {
  return new RadarNormalConfig().config
}

export { getRadarNormalConfig }
