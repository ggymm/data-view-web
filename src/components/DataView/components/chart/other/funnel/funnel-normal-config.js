const FunnelNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '',
    chartType: 'FunnelNormal',
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
      sql: 'select * from pie_normal'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '普通漏斗图',
        x: 'center',
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
      series: [
      ]
    }
  }
}

const getFunnelNormalConfig = function() {
  return new FunnelNormalConfig().config
}

export { getFunnelNormalConfig }
