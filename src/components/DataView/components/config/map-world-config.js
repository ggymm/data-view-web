const MapWorldConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'mapWorld',
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
        text: '世界地图',
        left: 'center',
        top: 'top',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          var value = (params.value + '').split('.')
          value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1]
          return params.seriesName + '<br/>' + params.name + ':' + value
        }
      },
      visualMap: {
        min: 0,
        max: 1000000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '世界地图',
          type: 'map',
          mapType: 'world',
          roam: true,
          itemStyle: {
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: []
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getMapWorldConfig = function() {
  return new MapWorldConfig().config
}

export { getMapWorldConfig }
