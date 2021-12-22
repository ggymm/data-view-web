const PieNormalConfig = function() {
  this.config = {
    name: '标准饼图',
    type: 'PieNormal',
    version: 1,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    style: {
      x: 0,
      y: 0,
      width: 350,
      height: 250,
      rotate: 0
    },
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      name: 'name',
      value: 'value',
      sql: 'select * from pie_normal',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
    },
    data: {
      'source': [
        ['dimension', ''],
        ['直接访问', '335'],
        ['邮件营销', '310'],
        ['联盟广告', '274'],
        ['视频广告', '235'],
        ['搜索引擎', '400']
      ]
    },
    interval: 8000,
    option: {
      title: {
        text: '标准饼图',
        x: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        show: false,
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '70%'],
          roseType: false,
          label: {},
          labelLine: {}
        }
      ]
    }
  }
}

const getPieNormalConfig_1 = function() {
  return new PieNormalConfig().config
}

export { getPieNormalConfig_1 }
