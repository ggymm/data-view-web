const PieRingConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'pieRing',
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
        text: '环形饼图',
        left: 'center',
        top: 'top',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'item',
        formatter: ''
      },
      color: ['#5098c7', '#f79665', '#83c094', '#fdd869'],
      legend: { show: true, orient: 'vertical', top: '0', left: '0', data: [], textStyle: { color: '#fff' }},
      series: [{
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: { show: false, position: 'center' },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '15',
              fontWeight: 'bold'
            },
            formatter: ''
          }
        },
        labelLine: {
          normal: {
            show: false,
            lineStyle: {
              color: '#ffffff'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        data: []
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

const getPieRingConfig = function() {
  return new PieRingConfig().config
}

export { getPieRingConfig }
