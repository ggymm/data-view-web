const PieNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'PieNormal',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
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
        text: '普通饼图',
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
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '70%'],
          roseType: false,
          label: {},
          labelLine: {}
        }
      ]
    }
  }
}

const getPieNormalConfig = function() {
  return new PieNormalConfig().config
}

export { getPieNormalConfig }
