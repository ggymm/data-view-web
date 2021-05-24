const ScatterNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'ScatterNormal',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select x,y,value,year from plot_bubble',
      x: 'x',
      y: 'y',
      value: 'value',
      legend: 'year'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        show: true,
        text: '气泡散点图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '10%',
        top: '60',
        right: '10%',
        bottom: '60'
      },
      xAxis: {
        show: true,
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisLabel: {
          show: true,
          color: '#ffffff'
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#cccccc']
          }
        }
      },
      yAxis: {},
      series: []
    }
  }
}

const getScatterNormalConfig = function() {
  return new ScatterNormalConfig().config
}

export { getScatterNormalConfig }
