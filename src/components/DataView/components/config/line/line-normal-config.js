const LineNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'lineNormal',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select x,y,name from line_normal',
      legend: '无',
      name: 'x',
      value: 'y'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        show: true,
        text: '标准折线图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {},
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

const getLineNormalConfig = function() {
  return new LineNormalConfig().config
}

export { getLineNormalConfig }
