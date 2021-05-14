const MapProvinceConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'mapProvince',
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
        text: '省份地图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      visualMap: {
        min: 0,
        max: 500,
        text: ['高', '低'],
        calculable: true,
        color: ['#f7491a', '#F58635', '#F8CA3E', '#5ADB53']
      },
      tooltip: {
        formatter: ''
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          type: 'map',
          mapType: 'liaoning',
          label: {
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#389BB7',
              label: {
                show: true,
                textStyle: {
                  color: 'rgb(249, 249, 249)'
                },
                formatter: '{b} \n AQI:{c}'
              }
            },
            emphasis: {
              borderWidth: 0
            }
          },
          animation: false
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getMapProvinceConfig = function() {
  return new MapProvinceConfig().config
}

export { getMapProvinceConfig }
