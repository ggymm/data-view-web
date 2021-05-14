const RelationOneConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'relationOne',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from relation_one',
      name: 'name',
      value: 'flow',
      legend: 'group',
      x: 'x',
      y: 'y'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '关系图一',
        subtext: 'Circularlayout',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {},
      legend: [{
        data: [],
        left: 'right',
        textStyle: {
          color: '#fff'
        }
      }],
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: 'LesMiserables',
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: [],
        links: [],
        categories: [],
        roam: true,
        label: {
          normal: {
            position: 'right',
            formatter: '{b}'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.3
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

const getRelationOneConfig = function() {
  return new RelationOneConfig().config
}

export { getRelationOneConfig }
