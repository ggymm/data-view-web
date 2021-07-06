import Vue from 'vue'
import bus from '@/utils/bus'
import scriptUrl from '@/assets/icon/iconfont.js'

import antd from 'ant-design-vue'
import { Icon, Modal, message, notification } from 'ant-design-vue'
Vue.use(antd)

message.config({
  maxCount: 1
})

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

const CustomIcon = Icon.createFromIconfontCN({
  scriptUrl: scriptUrl
})

Vue.component('icon', CustomIcon)

Vue.prototype.$bus = bus
