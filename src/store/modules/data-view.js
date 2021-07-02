import screen from './data-view/screen.js'
import keymap from './data-view/keymap.js'
import contextmenu from './data-view/contextmenu.js'

export default {
  state: {
    ...screen.state,
    ...keymap.state,
    ...contextmenu.state
  },
  mutations: {
    ...screen.mutations,
    ...keymap.mutations,
    ...contextmenu.mutations
  },
  actions: {
    ...screen.actions,
    ...keymap.actions,
    ...contextmenu.actions
  }
}
