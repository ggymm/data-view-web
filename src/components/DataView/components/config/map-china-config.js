const MapChinaConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'mapChina',
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
        text: '中国地图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      grid: {
        top: '60',
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [],
        textStyle: { color: '#fff' }
      },
      visualMap: {
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true
      },
      geo: {
        map: 'china',
        itemStyle: {
          areaColor: '#323c48',
          borderColor: '#111'
        }
      },
      backgroundColor: 'rgba(255,255,255,0)',
      toolbox: {
        feature: {
          saveAsImage: {}
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
