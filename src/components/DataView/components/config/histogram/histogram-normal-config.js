const HistogramNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'HistogramNormal',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      dimension: '无',
      name: 'product',
      value: 'amount',
      sql: 'select * from histogram_normal'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '标准柱状图',
        left: 'center',
        textStyle: { color: '#fff' }
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
      yAxis: {
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
      series: []
    }
  }
}

const getHistogramNormalConfig = function() {
  return new HistogramNormalConfig().config
}

export { getHistogramNormalConfig }
