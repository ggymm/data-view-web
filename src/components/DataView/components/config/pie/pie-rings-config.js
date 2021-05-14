const PieRingsConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'pieRings',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select name,value from pierings',
      name: 'name',
      value: 'value'
    },
    data: [],
    interval: 8000,
    option: {
      title: { text: '环形饼图列表', x: 'center', textStyle: { color: '#fff' }},
      legend: { x: 'center', y: 'center', textStyle: { color: '#fff' }},
      series: [],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPieRingsConfig = function() {
  return new PieRingsConfig().config
}

export { getPieRingsConfig }
