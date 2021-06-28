const ImageChartConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartName: '图片',
    chartType: 'ImageChart',
    lock: 'false',
    chartVersion: 1,
    rotate: 0,
    show: 'true',
    choose: 'false',
    refresh: 'false',
    chartData: {},
    data: [],
    interval: 8000,
    option: {
      url: '',
      rotateX: 0,
      rotateY: 0,
      scaleX: 1,
      scaleY: 1,
      translateX: 0,
      translateY: 0
    }
  }
}

const getImageChartConfig_1 = function() {
  return new ImageChartConfig().config
}

export { getImageChartConfig_1 }
