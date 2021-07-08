import { v4 as uuidv4 } from 'uuid'
import debounce from '@/utils/debounce'

export default {
  state: {
    items: [],
    clickItem: false,
    currentItem: null,
    currentIndex: 0,

    // 设计器状态
    moving: false,
    resizing: false,
    // 画布宽高
    canvasConfig: {
      padding: 64,
      width: 1920,
      height: 1080,
      scale: 0.2,
      // 参考线
      refLine: true,
      // 指示线
      indicatorLine: true
    },
    // 大屏宽高（设计）
    screenConfig: {
      title: '',
      diff: 5,
      width: 1920,
      height: 1080,
      theme: '',
      // backgroundImg: '/group1/default/20210513/17/59/6/云资源监控-背景.png'
      // backgroundImg: '/storage/2021/0530/云服务监控-背景.png'
      backgroundImg: ''
    }
  },
  mutations: {
    SET_ITEMS(state, payload) {
      const items = []
      payload.forEach(c => {
        c.hover = false
        items.push(c)
      })
      state.items = items
    },
    addItem(state, item) {
      item.elId = uuidv4()
      state.items.push(item)
    },
    moveItem(state, { i, type }) {
      switch (type) {
        case 'up':
          if (i > 0) {
            state.items.splice(i - 1, 0, ...state.items.splice(i, 1))
          }
          break
        case 'down':
          if (i + 1 < state.items.length) {
            state.items.splice(i + 1, 0, ...state.items.splice(i, 1))
          }
          break
        case 'top':
          if (i > 0) {
            state.items.unshift(...state.items.splice(i, 1))
          }
          break
        case 'bottom':
          if (i + 1 < state.items.length) {
            state.items.push(...state.items.splice(i, 1))
          }
          break
      }
    },
    setCurrentItem(state, { item, index }) {
      // 每次选中，重置复制次数
      state.copyNum = 1
      state.currentItem = item
      state.currentIndex = index
    },
    setClickItem(state, status) {
      state.clickItem = status
    },
    setHoverItem(state, { index, status }) {
      state.items[index].hover = status
    },
    setMoveStatus(state, status) {
      state.moving = status
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
        width = width - state.canvasConfig.padding * 2
        height = height - state.canvasConfig.padding * 2
        let scale
        if ((state.screenConfig.width / state.screenConfig.height) >= (width / height)) {
          scale = width / state.screenConfig.width * 100
        } else {
          scale = height / state.screenConfig.height * 100
        }
        this.commit('setCanvasScale', {
          scale,
          width: screenWrapper.clientWidth,
          height: screenWrapper.clientHeight
        })
      }, 200)

      if (!window.onresize) {
        window.onresize = resize
      }

      resize()
    },
    setCanvasScale(state, { scale, width, height }) {
      // 隐藏框选
      this.commit('setGroupAreaShow', false)
      // 计算设计器面板大小
      scale = Math.min(Math.max(scale, 20), 200) / 100
      state.canvasConfig.scale = scale
      if (!width || !height) {
        const screenWrapper = document.getElementById('screenWrapper')
        width = screenWrapper.clientWidth
        height = screenWrapper.clientHeight
      }
      const resolution = state.screenConfig.width / state.screenConfig.height
      if (resolution >= (width / height)) {
        state.canvasConfig.width = state.screenConfig.width * scale + state.canvasConfig.padding * 2
        state.canvasConfig.height = height
      } else {
        state.canvasConfig.width = width
        state.canvasConfig.height = state.screenConfig.height * scale + state.canvasConfig.padding * 2
      }
    },
    setRefLine(state, refLine) {
      state.canvasConfig.refLine = refLine
    },
    setIndicatorLine(state, indicatorLine) {
      state.canvasConfig.indicatorLine = indicatorLine
    },

    // 大屏配置相关
    setScreenConfig(state, style) {
      state.screenConfig = style
    }
  },
  actions: {
    async setCharts({ commit }, charts) {
      commit('SET_ITEMS', charts)
    }
  }
}
