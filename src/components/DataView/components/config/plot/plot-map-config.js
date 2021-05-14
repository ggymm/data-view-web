const PlotMapConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'plotMap',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select legend, x, y from scatter_map',
      x: 'x',
      y: 'y',
      legend: 'legend'
    },
    data: [],
    interval: 8000,
    option: {
      showDetail: '0',
      title: {
        text: '散点地图',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {},
      legend: {
        left: 'left',
        data: ['强', '中', '弱'],
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        name: '强',
        type: 'scatter',
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
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
      series: [
        {
          name: '弱',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(37,140,249,1)',
              color: 'rgba(37,140,249,1)'
            }
          },
          data: []
        },
        {
          name: '中',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(14,241,242,1)',
              color: 'rgba(14,241,242,1)'
            }
          },
          data: []
        },
        {
          name: '强',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(255,255,255,1)',
              color: 'rgba(255,255,255,1)'
            }
          },
          data: []
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPlotMapConfig = function() {
  return new PlotMapConfig().config
}

export { getPlotMapConfig }
