const PieNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'pieNormal',
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
      title: {
        text: '普通饼图',
        x: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        show: true,
        orient: 'vertical',
        data: [],
        top: '0',
        left: '0',
        textStyle: { color: '#ffffff' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: [],
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 5,
            length2: 8
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,1)'
          },
          normal: {
            opacity: 1
          }
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

const getPieNormalConfig = function() {
  return new PieNormalConfig().config
}

export { getPieNormalConfig }
