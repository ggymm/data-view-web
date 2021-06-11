const PictorialBarConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '',
    chartType: 'PictorialBar',
    rotate: 0,
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      dimension: '无',
      name: 'name',
      value: 'value',
      sql: 'select * from pictorial_bar'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '象形柱状图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      legend: {
        show: false,
        textStyle: {
          color: '#ffffff'
        }
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
        axisTick: {
          show: false
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
        axisTick: {
          show: false
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

const getPictorialBarConfig = function() {
  return new PictorialBarConfig().config
}

export { getPictorialBarConfig }
