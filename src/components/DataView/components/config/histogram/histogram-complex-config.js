const HistogramComplexConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'histogramComplex',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from histogram_complex_bar UNION select * from histogram_complex_line',
      x: 'xaxis',
      y: 'value',
      legend: 'name'
    },
    data: {},
    interval: 8000,
    option: {
      title: { text: '复合柱状图', left: 'center', textStyle: { color: '#fff' }},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      grid: { left: '1%', right: '4%', bottom: '10%', containLabel: true },
      legend: {
        show: true,
        data: [],
        textStyle: { color: '#fff' },
        top: '0',
        left: '0'
      },
      dataZoom: { show: false, start: 0, end: 100 },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        data: [],
        name: '',
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 }, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff', type: 'dashed' }}, // 图上的分隔线
        axisPointer: {
          type: 'shadow'
        }
      }, {
        type: 'category',
        boundaryGap: true,
        data: [],
        name: '',
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}, // 图上的分隔线
        axisPointer: {
          type: 'shadow'
        }
      }],
      yAxis: [{
        type: 'value',
        scale: true,
        name: '',
        min: 0,
        boundaryGap: [0.2, 0.2],
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }, type: 'dashed' }// 图上的分隔线
      }, {
        type: 'value',
        scale: true,
        name: '',
        min: 0,
        boundaryGap: [0.2, 0.2],
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}// 图上的分隔线
      }],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        { name: '', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: [] },
        { name: '', type: 'line', data: [] }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHistogramComplexConfig = function() {
  return new HistogramComplexConfig().config
}

export { getHistogramComplexConfig }
