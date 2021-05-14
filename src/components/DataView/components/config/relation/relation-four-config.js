const RelationFourConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'relationFour',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from relation_four',
      name: 'name',
      value: 'flow',
      legend: 'group'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '关系图四',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other'],
        textStyle: {
          color: '#fff'
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: [{}],
        animation: false,
        label: {
          normal: {
            position: 'right',
            formatter: '{b}'
          }
        },
        draggable: true,
        categories: [],
        force: {
          edgeLength: 5,
          repulsion: 20,
          gravity: 0.2
        },
        edges: []
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

const getRelationFourConfig = function() {
  return new RelationFourConfig().config
}

export { getRelationFourConfig }
