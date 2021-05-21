const TitleTextConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartType: 'titleText',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: '',
      x: '',
      name: ''
    },
    data: [],
    interval: 8000,
    option: {
      title: '标题文本',
      fontColor: '#ffffff',
      fontSize: 16,
      fontWeight: 'normal',
      textAlign: 'center'
    }
  }
}

const getTitleTextConfig = function() {
  return new TitleTextConfig().config
}

export { getTitleTextConfig }
