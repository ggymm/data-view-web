const ImageChartConfig = function() {
  this.config = {
    name: '图片',
    type: 'ImageChart',
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
