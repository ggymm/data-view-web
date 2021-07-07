import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

import '@/lazy_use'
import '@/permission'

import '@/styles/animate.css'
import '@/styles/global.less'

Vue.config.productionTip = false

// use pro-layout config
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.Vue = Vue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
