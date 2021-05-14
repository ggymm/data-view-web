const HeatBasicConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    type: 'heatBasic',
    chartType: 'heatBasic',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from heat_basic',
      x: 'x',
      y: 'y',
      value: 'elevation'
    },
    data: [],
    interval: 8000,
    option: {
      animation: false,
      bmap: {
        center: [120.13066322374, 30.240018034923],
        zoom: 14,
        roam: true
      },
      visualMap: {
        show: false,
        top: 'top',
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data: [],
        pointSize: 5,
        blurSize: 6
      }],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getHeatBasicConfig = function() {
  return new HeatBasicConfig().config
}

export { getHeatBasicConfig }
