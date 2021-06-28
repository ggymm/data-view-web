const TitleTextConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '标题文本',
    chartType: 'TitleText',
    chartVersion: 1,
    rotate: 0,
    show: 'true',
    lock: 'false',
    choose: 'false',
    refresh: 'false',
    chartData: {},
    data: {},
    interval: 8000,
    option: {
      title: '标题文本',
      fontColor: '#ffffff',
      fontSize: 16,
      height: 50,
      fontWeight: 'normal',
      textAlign: 'center'
    }
  }
}

const getTitleTextConfig_1 = function() {
  return new TitleTextConfig().config
}

export { getTitleTextConfig_1 }
