const MapChinaConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '地图',
    chartType: 'MapChina',
    chartVersion: 1,
    rotate: 0,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      fileName: '',
      name: 'name',
      value: 'value',
      sql: 'select * from map_china_new'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        show: true,
        text: '地图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        show: false,
        textStyle: {
          color: '#ffffff'
        }
      },
      visualMap: {
        show: true,
        text: []
      },
      geo: {
        map: 'china'
      },
      series: [
        {
          type: 'map',
          map: 'china',
          itemStyle: {
            areaColor: '#080B19',
            borderColor: '#00C8DC'
          },
          showLegendSymbol: false
        }
      ]
    }
  }
}

const getMapChinaConfig_1 = function() {
  return new MapChinaConfig().config
}

export { getMapChinaConfig_1 }
