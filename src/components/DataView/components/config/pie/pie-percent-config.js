const PiePercentConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'piePercent',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from pie_percent',
      value: 'value'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '环形百分比图',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#98a0c4',
          fontSize: 20
        }
      },
      series: [
        {
          name: 'main',
          type: 'pie',
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 50,
              itemStyle: {
                normal: {
                  color: 'rgba(119,96,246,1)'
                }
              }
            },
            {
              value: 50,
              itemStyle: {
                normal: {
                  color: 'rgba(44,52,92,1)'
                }
              }
            }
          ]
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPiePercentConfig = function() {
  return new PiePercentConfig().config
}

export { getPiePercentConfig }
