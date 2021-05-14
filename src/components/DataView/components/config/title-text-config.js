const TitleTextConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
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
      fontColor: 'rgba(255,255,255,1)',
      fontSize: 12,
      fontWeight: 'normal',
      textAlign: 'center',
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getTitleTextConfig = function() {
  return new TitleTextConfig().config
}

export { getTitleTextConfig }
