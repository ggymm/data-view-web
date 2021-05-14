const RelationTwoConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'relationTwo',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from relation_two',
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
        text: '关系图二',
        subtext: 'Defaultlayout',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {},
      legend: [{ data: [], left: 'right', textStyle: { color: '#fff' }}],
      animation: false,
      series: [{
        name: 'LesMiserables',
        type: 'graph',
        layout: 'force',
        data: [],
        links: [],
        categories: [],
        roam: 'scale',
        label: { normal: { position: 'right' }}
        // force: { repulsion: 100 }
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

const getRelationTwoConfig = function() {
  return new RelationTwoConfig().config
}

export { getRelationTwoConfig }
