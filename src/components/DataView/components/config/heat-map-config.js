const HeatMapConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'heatMap',
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
        text: '热力地图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      visualMap: {
        min: 0,
        max: 500,
        splitNumber: 5,
        inRange: {
          color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
        },
        textStyle: { color: '#fff' }
      },
      geo: {
        map: 'china',
        label: { emphasis: { show: false }},
        roam: true,
        itemStyle: {
          normal: { areaColor: '#323c48', borderColor: '#111' },
          emphasis: { areaColor: '#2a333d' }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: []
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHeatMapConfig = function() {
  return new HeatMapConfig().config
}

export { getHeatMapConfig }
