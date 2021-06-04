export default {
  state: {
    scale: 100,
    panelStyle: {
      width: 1920,
      height: 1080,
      backgroundImg: '/group1/default/20210513/17/59/6/云资源监控-背景.png'
    },
    charts: [],
    currentItem: null
  },
  mutations: {
    setScale(state, scale) {
      state.scale = scale
    },
    setPanelStyle(state, style) {
      state.panelStyle = style
    },
    addItem(state, chart) {
      console.log(chart)
      state.charts.push(chart)
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    }
  }
}
