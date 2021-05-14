const Pie2DConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'pie2D',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select name,value from pie',
      name: 'name',
      value: 'value'
    },
    data: [],
    interval: 8000,
    option: {
      lunbo: '0',
      title: {
        text: '2D饼图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      legend: { show: true, orient: 'vertical', top: '0', left: '0', data: [], textStyle: { color: '#fff' }},
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [].sort(function(a, b) {
          return a.value - b.value
        }),
        roseType: 'angle',
        label: {
          normal: {
            show: true,
            position: 'outside',
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '',
            shadowBlur: 200,
            shadowColor: 'rgba(0,0,0,0)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        avoidLabelOverlap: true,
        animationDelay: function(idx) {
          return Math.random() * 200
        }
      }],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPie2DConfig = function() {
  return new Pie2DConfig().config
}

export { getPie2DConfig }
