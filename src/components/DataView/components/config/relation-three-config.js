const RelationThreeConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'relationThree',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from relation_three',
      name: 'name',
      x: 'x',
      y: 'y'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '关系图三',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      grid: { left: '1%', right: '4%', bottom: '10%', containLabel: true },
      series: [{
        type: 'graph',
        layout: 'none',
        data: [{}],
        edges: {},
        label: {
          emphasis: {
            position: 'right',
            show: true
          }
        },
        roam: true,
        focusNodeAdjacency: true,
        lineStyle: {
          normal: {
            width: 0.5,
            curveness: 0.3,
            opacity: 0.7
          }
        }
      }],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getRelationThreeConfig = function() {
  return new RelationThreeConfig().config
}

export { getRelationThreeConfig }
