export default {
  state: {
    scale: 100,
    panelWidth: 1920,
    panelHeight: 1080,
    backgroundImg: '/storage/2021/0531/通用模板1-背景.png',

    charts: [],
    currentItem: null
  },
  mutations: {
    addItem(state, chart) {
      console.log(chart)
      state.charts.push(chart)
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    }
  }
}
