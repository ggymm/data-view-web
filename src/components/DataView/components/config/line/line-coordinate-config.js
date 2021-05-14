const LineCoordinateConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'lineCoordinate',
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
        text: '时间轴折线图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { animation: false }
      },
      legend: {
        show: true,
        data: []
      },
      grid: { left: '1%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: {
        name: '',
        type: 'time', // 坐标轴类型 time category log value
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 },
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisTick: { show: false },
        boundaryGap: false,
        data: [],
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      yAxis: {
        name: '',
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      series: [{
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: false,
        hoverAnimation: false,
        data: []
      }],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getLineCoordinateConfig = function() {
  return new LineCoordinateConfig().config
}

export { getLineCoordinateConfig }
