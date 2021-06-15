import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash/debounce'

export default {
  state: {
    slices: [],
    currentItem: null,
    // 图表状态
    moving: false,
    resizing: false,
    // 画布宽高
    canvasConfig: {
      width: 1920,
      height: 1080,
      scale: 0.2
    },
    // 大屏宽高（设计）
    screenConfig: {
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
        c.hover = false
        slices.push(c)
      })
      state.slices = slices
    },
    addItem(state, item) {
      item.elId = uuidv4()
      item.index = state.slices.length
      state.slices.push(item)
    },
    moveItem(state, { i, type }) {
      switch (type) {
        case 'up':
          if (i > 0) {
            state.slices.splice(i - 1, 0, ...state.slices.splice(i, 1))
          }
          break
        case 'down':
          if (i + 1 < state.slices.length) {
            state.slices.splice(i + 1, 0, ...state.slices.splice(i, 1))
          }
          break
        case 'top':
          if (i > 0) {
            state.slices.unshift(...state.slices.splice(i, 1))
          }
          break
        case 'bottom':
          if (i + 1 < state.slices.length) {
            state.slices.push(...state.slices.splice(i, 1))
          }
          break
      }
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    setResizeStatus(state, status) {
      state.resizing = status
    },

    // 画布相关
    autoCanvasScale(state) {
      const resize = debounce(() => {
        const screenWrapper = document.getElementById('screenWrapper')
        let width = screenWrapper.clientWidth
        let height = screenWrapper.clientHeight
        width = width - 128
        height = height - 128
        let scale
        if ((state.screenConfig.width / state.screenConfig.height) >= (width / height)) {
          scale = width / state.screenConfig.width * 100
        } else {
          scale = height / state.screenConfig.height * 100
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
      state.canvasConfig.scale = scale
      state.canvasConfig.width = state.screenConfig.width * scale + 128
      state.canvasConfig.height = state.screenConfig.height * scale + 128
    },

    // 大屏配置相关
    setScreenConfig(state, style) {
      state.screenConfig = style
    },

    RECORD_SNAPSHOT(state) {
    }
  },
  actions: {
    async setCharts({ commit }, charts) {
      commit('SET_SLICES', charts)
    },
    recordSnapshot({ commit }) {
      commit('RECORD_SNAPSHOT')
    }
  }
}
