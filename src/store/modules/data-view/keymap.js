import store from '@/store'

export default {
  state: {
    num: 1,
    step: 20,
    copyData: null
  },
  mutations: {
    itemCopy(state) {
      if (!state.currentItem) return
      state.num = 1
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
        newItem.x += state.num * state.step
        newItem.y += state.num * state.step
      } else {
        newItem.x += state.num * state.step
        newItem.y += state.num * state.step
      }

      state.num += 1
      store.commit('addItem', newItem)
    }
  },
  actions: {

  }
}
