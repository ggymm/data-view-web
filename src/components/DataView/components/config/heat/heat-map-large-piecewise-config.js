const HeatMapLargePiecewiseConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'heatMapLargePiecewise',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: '',
      x: '',
      name: ''
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '颜色的离散映射热力图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {},
      grid: { left: '1%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: {
        name: '',
        type: 'category',
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 },
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }},
        data: []
      },
      yAxis: {
        name: '',
        type: 'category',
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }},
        data: []
      },
      visualMap: {
        min: 0,
        max: 500,
        calculable: true,
        realtime: false,
        inRange: {
          color: ['rgba(107,205,40,1)', 'yellow', 'orange', 'red', 'rgba(182,33,145,1)', 'rgba(57,7,7,1)']
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [{
        name: '',
        type: 'heatmap',
        data: [],
        itemStyle: {
          emphasis: {
            borderColor: '#333',
            borderWidth: 1
          }
        },
        progressive: 1000,
        animation: false
      }],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHeatMapLargePiecewiseConfig = function() {
  return new HeatMapLargePiecewiseConfig().config
}

export { getHeatMapLargePiecewiseConfig }
