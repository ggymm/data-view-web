const WordCloudConfig = function() {
  this.config = {
    name: '词云',
    type: 'wordCloud',
    version: 1,
    show: 'true',
    choose: 'false',
    refresh: 'false',
    style: {
      x: 0,
      y: 0,
      width: 350,
      height: 250,
      rotate: 0
    },
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      name: 'name',
      value: 'value',
      sql: 'select * from pie',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
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

const getWordCloudConfig_1 = function() {
  return new WordCloudConfig().config
}

export { getWordCloudConfig_1 }
