import echarts from 'vue-echarts'

const HistogramGradientConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'histogramGradient',
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
    data: {
      x: [],
      value: []
    },
    interval: 8000,
    option: {
      title: {
        text: '渐变柱状图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      legend: {
        show: false
      },
      backgroundColor: '',
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: [],
        name: '',
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLabel: { show: true, inside: false, textStyle: { color: '#fff' }, rotate: -45, interval: 0 },
        z: 10
      },
      yAxis: {
        name: '',
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLabel: { show: true, textStyle: { color: '#fff' }}
      },
      dataZoom: [{ type: 'inside' }],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: { 'color': 'rgba(255,255,255,0)' }
          },
          barWidth: '30%',
          barGap: '-100%',
          barCategoryGap: '0',
          data: [],
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          data: []
        }
      ]
    }
  }
}

const getHistogramGradientConfig = function() {
  return new HistogramGradientConfig().config
}

export { getHistogramGradientConfig }
