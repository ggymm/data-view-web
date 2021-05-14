const WordCloudConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'wordCloud',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from pie',
      value: 'value',
      name: 'name'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '词云',
        x: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        show: true
      },
      series: [{
        type: 'wordCloud',
        sizeRange: [6, 66],
        rotationRange: [-45, 90],
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize: 6
        },
        textStyle: {
          normal: {
            color: function() {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
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

const getWordCloudConfig = function() {
  return new WordCloudConfig().config
}

export { getWordCloudConfig }
