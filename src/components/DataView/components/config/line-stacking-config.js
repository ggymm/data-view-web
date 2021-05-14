const LineStackingConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'lineStacking',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from line_stacking',
      x: 'x',
      y: 'y',
      legend: 'name'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '堆叠折线图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      grid: {
        top: '60',
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      legend: {
        left: '1%',
        top: '5%',
        textStyle: { color: '#fff' }
      },
      tooltip: {},
      dataset: {
        source: []
      },
      xAxis: {
        name: '',
        type: 'category',
        boundaryGap: true,
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 },
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      yAxis: {
        name: '',
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getLineStackingConfig = function() {
  return new LineStackingConfig().config
}

export { getLineStackingConfig }
