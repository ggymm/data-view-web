import Vue from 'vue'
import Vuex from 'vuex'

import dataView from './modules/data-view.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...dataView.state
  },
  mutations: {
    ...dataView.mutations
  },
  actions: {
    ...dataView.actions
  }
})

export default store
