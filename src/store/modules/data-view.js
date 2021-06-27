import screen from './data-view/screen.js'
import keymap from './data-view/keymap'

export default {
  state: {
    ...screen.state,
    ...keymap.state
  },
  mutations: {
    ...screen.mutations,
    ...keymap.mutations
  },
  actions: {
    ...screen.actions,
    ...keymap.actions
  }
}
