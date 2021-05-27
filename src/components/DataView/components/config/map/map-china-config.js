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
      dimension: 'legend',
      name: 'name',
      value: 'value',
      sql: 'select * from map_china'
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
        map: 'china'
      },
      series: []
    }
  }
}

const getMapChinaConfig = function() {
  return new MapChinaConfig().config
}

export { getMapChinaConfig }
