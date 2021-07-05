export default {
  state: {
    groupAreaShow: false,
    groupIndex: new Set()
  },
  mutations: {
    setGroupAreaShow(state, status) {
      state.groupAreaShow = status
      if (!status) {
        this.commit('removeAllGroupIndex')
      }
    },
    addGroupIndex(state, index) {
      state.groupIndex.add(index)
    },
    deleteGroupIndex(state, index) {
      state.groupIndex.delete(index)
    },
    removeAllGroupIndex(state) {
      for (const i of state.groupIndex) {
        this.commit('setHoverItem', {
          index: i,
          status: false
        })
      }
      state.groupIndex.clear()
    }
  },
  actions: {}
}
