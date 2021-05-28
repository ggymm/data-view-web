const MapChinaConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'MapChina',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
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
        text: '中国地图',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        show: false
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

const getMapChinaConfig = function() {
  return new MapChinaConfig().config
}

export { getMapChinaConfig }
