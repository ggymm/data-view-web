const PictorialBarConfig = function() {
  this.config = {
    name: '象形柱状图',
    type: 'PictorialBar',
    version: 1,
    show: 'true',
    lock: 'false',
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
      dimension: '无',
      name: 'name',
      value: 'value',
      sql: 'select * from pictorial_bar',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
    },
    data: {
      'source': [
        ['dimension'],
        ['周一', '120'],
        ['周二', '132'],
        ['周三', '101'],
        ['周四', '134'],
        ['周五', '90'],
        ['周六', '230'],
        ['周日', '210']
      ]
    },
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

const getPictorialBarConfig_1 = function() {
  return new PictorialBarConfig().config
}

export { getPictorialBarConfig_1 }
