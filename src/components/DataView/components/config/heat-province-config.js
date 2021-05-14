const HeatProvinceConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'heatProvince',
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
      dot: 'false',
      title: {
        text: '全国主要城市空气质量',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      visualMap: {
        min: 0,
        max: 500,
        splitNumber: 5,
        inRange: {
          color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: '',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [{
        name: 'AQI',
        type: 'heatmap',
        mapType: 'liaoning',
        coordinateSystem: 'geo',
        data: []
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 15,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHeatProvinceConfig = function() {
  return new HeatProvinceConfig().config
}

export { getHeatProvinceConfig }
