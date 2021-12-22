import store from '@/store'

export default {
  state: {
    step: 20,
    copyNum: 1,
    copyData: null
  },
  mutations: {
    itemCopy(state) {
      if (!state.currentItem) return
      state.copyNum = 1
      state.copyData = {
        data: JSON.parse(JSON.stringify(state.currentItem)),
        index: state.currentIndex
      }
    },
    itemPaste(state, mouse) {
      if (!state.copyData) return
      const newItem = JSON.parse(JSON.stringify(state.copyData.data))
      newItem.hover = false

      if (mouse) {
        newItem.style.x = state.contextmenuLeft - state.canvasConfig.padding
        newItem.style.y = state.contextmenuTop - state.canvasConfig.padding
      } else {
        newItem.style.x += state.copyNum * state.step
        newItem.style.y += state.copyNum * state.step
        state.copyNum += 1
      }
      store.commit('addItem', newItem)
    }
  },
  actions: {
  }
}
