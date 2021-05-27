const MapChinaConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'MapChina',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from map_china',
      name: 'name',
      value: 'value',
      legend: 'legend'
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
      grid: {
      },
      geo: {
        map: 'china',
        itemStyle: {
          areaColor: '#323c48',
          borderColor: '#111'
        }
      },
      series: []
    }
  }
}

const getMapChinaConfig = function() {
  return new MapChinaConfig().config
}

export { getMapChinaConfig }
