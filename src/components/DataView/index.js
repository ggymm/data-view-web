import Vue from 'vue'
// 全量引入echarts
import * as echarts from 'echarts'

import VueECharts from 'vue-echarts'

import chinaMap from './map/china.json'

echarts.registerMap('china', chinaMap)

Vue.component('echarts', VueECharts)
