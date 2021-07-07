import Vue from 'vue'
// 全量引入echarts
import * as echarts from 'echarts'

import VueECharts from 'vue-echarts'

import chinaMap from './map/china.json'
import chinaMapNew from './map/china-new.json'

echarts.registerMap('china', chinaMap)
echarts.registerMap('china-new', chinaMapNew)

Vue.component('echarts', VueECharts)
