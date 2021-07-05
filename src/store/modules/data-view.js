import screen from './data-view/screen.js'
import refline from './data-view/refline.js'
import keymap from './data-view/keymap.js'
import contextmenu from './data-view/contextmenu.js'
import group from './data-view/group.js'

export default {
  state: {
    ...screen.state,
    ...refline.state,
    ...keymap.state,
    ...contextmenu.state,
    ...group.state
  },
  mutations: {
    ...screen.mutations,
    ...refline.mutations,
    ...keymap.mutations,
    ...contextmenu.mutations,
    ...group.mutations
  },
  actions: {
    ...screen.actions,
    ...refline.actions,
    ...keymap.actions,
    ...contextmenu.actions,
    ...group.actions
  }
}
