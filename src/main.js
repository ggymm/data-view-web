import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import GlobalComponents from '@/components/DataView/global-components'

import './core/lazy_use' // use lazy load components
import './global.less' // global style

Vue.config.productionTip = false

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

Vue.use(GlobalComponents)

window.Vue = Vue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
