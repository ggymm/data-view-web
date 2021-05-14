const PlotBubbleConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'plotBubble',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select x,y,value,year from plot_bubble',
      x: 'x',
      y: 'y',
      value: 'value',
      legend: 'year'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '气泡散点图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      backgroundColor: 'rgba(255,255,255,0)',
      legend: {
        show: true,
        top: '0',
        left: '0',
        data: [],
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 14
        },
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 14
        },
        axisLabel: { show: true, textStyle: { color: '#fff' }}, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ffffff'
          }
        },
        scale: true
      },
      series: []
    }
  }
}

const getPlotBubbleConfig = function() {
  return new PlotBubbleConfig().config
}

export { getPlotBubbleConfig }
