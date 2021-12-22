const CarouselListConfig = function() {
  this.config = {
    name: '轮播列表',
    type: 'CarouselList',
    version: 1,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    style: {
      x: 0,
      y: 0,
      width: 350,
      height: 200,
      rotate: 0
    },
    chartData: {
      dataSourceType: '',
      staticData: '{}',
      database: '',
      sql: 'select * from carousel_list',
      restType: 'GET',
      restUrl: '',
      restHeader: '',
      restBody: '',
      fileName: ''
    },
    data: {
      'body': [
        ['1', 'key1', 'value1'],
        ['2', 'key2', 'value2'],
        ['3', 'key3', 'value3'],
        ['4', 'key4', 'value4']
      ],
      'header': ['id', 'name', 'value']
    },
    interval: 8000,
    option: {
      index: {
        show: false,
        width: 16,
        height: 16,
        background: []
      },
      header: {
        show: true,
        height: 50,
        fontColor: '#ffffff',
        fontSize: 13,
        data: []
      },
      body: {
        height: 30,
        fontColor: '#e2e2e2',
        fontSize: 12,
        speed: 3,
        rowNum: 5,
        data: []
      }
    }
  }
}

const getCarouselListConfig_1 = function() {
  return new CarouselListConfig().config
}

export { getCarouselListConfig_1 }
