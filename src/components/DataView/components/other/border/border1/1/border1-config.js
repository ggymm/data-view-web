const Border1Config = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    chartName: '边框1',
    chartType: 'Border1',
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
      border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
      color: ['#4fd2dd', '#235fa7'],
      backgroundColor: 'transparent'
    }
  }
}

const getBorder1Config_1 = function() {
  return new Border1Config().config
}

export { getBorder1Config_1 }
