import debounce from 'lodash/debounce'

export default {
  state: {
    slices: [],
    currentItem: null,
    // 图表状态
    moving: false,
    resizing: false,
    // 画布宽高
    canvasStyle: {
      width: 1920,
      height: 1080,
      scale: 0.2
    },
    // 大屏宽高（设计）
    screenStyle: {
      title: '',
      diff: 3,
      width: 1920,
      height: 1080,
      theme: '',
      // backgroundImg: '/group1/default/20210513/17/59/6/云资源监控-背景.png'
      // backgroundImg: '/storage/2021/0530/云服务监控-背景.png'
      backgroundImg: ''
    }
  },
  mutations: {
    SET_SLICES(state, payload) {
      const slices = []
      payload.forEach(c => {
        slices.push(c)
      })
      state.slices = slices
    },

    autoCanvasScale(state) {
      const resize = debounce(() => {
        const screenWrapper = document.getElementById('screenWrapper')
        let width = screenWrapper.clientWidth
        let height = screenWrapper.clientHeight
        width = width - 128
        height = height - 128
        let scale
        if ((state.screenStyle.width / state.screenStyle.height) >= (width / height)) {
          scale = width / state.screenStyle.width * 100
        } else {
          scale = height / state.screenStyle.height * 100
        }
        this.commit('setCanvasScale', scale)
      }, 200)

      if (!window.onresize) {
        window.onresize = resize
      }

      resize()
    },

    setCanvasScale(state, scale) {
      scale = Math.min(Math.max(scale, 20), 200) / 100
      state.canvasStyle.scale = scale
      state.canvasStyle.width = state.screenStyle.width * scale + 128
      state.canvasStyle.height = state.screenStyle.height * scale + 128
    },
    setScreenStyle(state, style) {
      state.screenStyle = style
    },
    addItem(state, chart) {
      state.charts.push(chart)
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    setItemStyle(state, { x, y, width, height, rotate }) {
      if (state.currentItem === null) return
      if (x) state.currentItem.x = x
      if (y) state.currentItem.y = y
      if (width) state.currentItem.width = width
      if (height) state.currentItem.height = height
      if (rotate) state.currentItem.rotate = rotate
    },
    setItemHover(state, status) {
      if (state.currentItem === null) return
      state.currentItem.hover = status
    },
    setResizeStatus(state, status) {
      state.resizing = status
    },
    recordSnapshot(state) {
    }
  },
  actions: {
    async setCharts({ commit }, charts) {
      commit('SET_SLICES', charts)
    }
  }
}
