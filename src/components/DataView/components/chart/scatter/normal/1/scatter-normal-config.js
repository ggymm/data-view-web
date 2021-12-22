const ScatterNormalConfig = function() {
  this.config = {
    name: '散点图',
    type: 'ScatterNormal',
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
      name: 'x',
      value: 'y',
      sql: 'select * from scatter_normal',
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
        show: true,
        text: '气泡散点图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
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
        },
        splitArea: {}
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
        },
        splitArea: {}
      },
      series: []
    }
  }
}

const getScatterNormalConfig_1 = function() {
  return new ScatterNormalConfig().config
}

export { getScatterNormalConfig_1 }
