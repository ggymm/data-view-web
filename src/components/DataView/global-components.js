// 全量引入echarts
import * as echarts from 'echarts'

import ECharts from 'vue-echarts'

import chinaMap from './map/china.json'

echarts.registerMap('china', chinaMap)

const GlobalComponents = {}

GlobalComponents.install = (Vue) => {
  Vue.prototype.theme = 'darkTheme'
  Vue.component('echarts', ECharts)
}

export default GlobalComponents
