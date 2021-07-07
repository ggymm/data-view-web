import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/permission'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import IconSvg from '@/components/IconSvg'
import antd from 'ant-design-vue'

import '@/styles/animate.css'
import '@/styles/global.less'

Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

Vue.component('icon', IconSvg)

Vue.use(antd)

Vue.config.productionTip = false

window.Vue = Vue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
