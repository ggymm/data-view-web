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
        text: '标准折线图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      series: [],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getLineNormalConfig = function() {
  return new LineNormalConfig().config
}

export { getLineNormalConfig }
