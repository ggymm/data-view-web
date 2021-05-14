const HistogramGradientHorizontalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'histogramGradientHorizontal',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from histogram_gradient',
      y: 'y',
      x: 'x'
    },
    data: {},
    interval: 8000,
    option: {
      title: {
        text: '水平柱状图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      legend: {
        show: true,
        orient: 'vertical',
        data: [],
        top: '0',
        left: '0',
        textStyle: { color: '#ffffff' }
      },
      xAxis: {
        data: [],
        name: '',
        type: 'value',
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}// 图上的分隔线
      },
      yAxis: {
        name: '',
        type: 'category',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}, // 图上的分隔线
        data: []
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: {
        name: '',
        type: 'bar',
        data: []
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHistogramGradientHorizontalConfig = function() {
  return new HistogramGradientHorizontalConfig().config
}

export { getHistogramGradientHorizontalConfig }
