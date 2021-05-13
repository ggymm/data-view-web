import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

import permission from './modules/permission'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    permission
  },
  getters
})
