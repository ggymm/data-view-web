import screen from './data-view/screen.js'
import refline from './data-view/refline.js'
import keymap from './data-view/keymap.js'
import contextmenu from './data-view/contextmenu.js'

export default {
  state: {
    ...screen.state,
    ...refline.state,
    ...keymap.state,
    ...contextmenu.state
  },
  mutations: {
    ...screen.mutations,
    ...refline.mutations,
    ...keymap.mutations,
    ...contextmenu.mutations
  },
  actions: {
    ...screen.actions,
    ...refline.actions,
    ...keymap.actions,
    ...contextmenu.actions
  }
}
