const CarouselListConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 200,
    chartType: 'CarouselList',
    rotate: 0,
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from carousel_list'
    },
    data: [],
    interval: 8000,
    option: {
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

const getCarouselListConfig = function() {
  return new CarouselListConfig().config
}

export { getCarouselListConfig }
