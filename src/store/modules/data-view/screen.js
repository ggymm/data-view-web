import debounce from 'lodash/debounce'

export default {
  state: {
    canvasStyle: {
      width: 1920,
      height: 1080,
      scale: 0.2
    },
    screenStyle: {
      diff: 3,
      width: 1920,
      height: 1080,
      backgroundImg: '/group1/default/20210513/17/59/6/云资源监控-背景.png'
    },
    charts: [],
    currentItem: null
  },
  mutations: {
    setCanvasScale(state, scale) {
      scale = Math.min(Math.max(scale, 20), 200) / 100
      state.canvasStyle.scale = scale
      state.canvasStyle.width = state.screenStyle.width * scale + 100
      state.canvasStyle.height = state.screenStyle.height * scale + 100
    },
    autoCanvasScale(state) {
      const resize = debounce(() => {
        console.groupCollapsed('自动缩放设置')
        const screenWrapper = document.getElementById('screenWrapper')
        let width = screenWrapper.clientWidth
        let height = screenWrapper.clientHeight
        console.log('wrapper实际大小', width, height)
        width = width - 100
        height = height - 100
        console.log('wrapper去除边框后大小', width, height)
        let scale
        if ((state.screenStyle.width / state.screenStyle.height) >= (width / height)) {
          scale = width / state.screenStyle.width * 100
        } else {
          scale = height / state.screenStyle.height * 100
        }
        console.log('设置最佳缩放值', scale)
        this.commit('setCanvasScale', scale)
        console.groupEnd()
      }, 200)

      if (!window.onresize) {
        window.onresize = resize
      }

      resize()
    },
    setScreenStyle(state, style) {
      state.screenStyle = style
    },
    setItemStyle(state, { x, y, width, height, rotate }) {
      if (x) state.currentItem.x = x
      if (y) state.currentItem.y = y
      if (width) state.currentItem.width = width
      if (height) state.currentItem.height = height
      if (rotate) state.currentItem.rotate = rotate
    },
    addItem(state, chart) {
      console.log(chart)
      state.charts.push(chart)
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    recordSnapshot(state) {

    }
  }
}
