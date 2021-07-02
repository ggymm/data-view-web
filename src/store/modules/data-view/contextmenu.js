export default {
  state: {
    contextmenuTop: 0,
    contextmenuLeft: 0,
    contextmenuShow: false
  },
  mutations: {
    showContextmenu(state, { top, left }) {
      state.contextmenuShow = true
      state.contextmenuTop = top
      state.contextmenuLeft = left
    },
    hideContextmenu(state) {
      state.contextmenuShow = false
    }
  },
  actions: {}
}
