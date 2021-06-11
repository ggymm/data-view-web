<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <a-layout class="data-view-container">
    <a-layout-header class="data-view-header">
      <a-menu
        class="data-view-menu"
        mode="horizontal"
        theme="dark"
        :selectable="false"
        :sub-menu-close-delay="0"
      >
        <a-sub-menu v-for="menu in menus" :key="menu.key">
          <span slot="title">{{ menu.title }}<a-icon type="caret-down" style="margin-left: 5px" /></span>
          <a-menu-item v-for="child in menu.children" :key="child.key" :draggable="true" @dragstart="handleDragStart($event, child.key)">
            <icon class="chart-type-icon" :type="`icon-${child.icon}`" />
            <span>{{ child.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout class="data-view-main">
      <a-layout-sider width="200">
        <layer />
      </a-layout-sider>
      <a-layout class="data-view-screen">
        <a-layout-content
          id="screenWrapper"
          class="data-view-screen-wrapper"
          @mousedown.stop="handleItemUnChoose"
        >
          <layout @dragover.native="handleDragOver" @drop.native="handleDrop">
            <item
              v-for="item in charts"
              :key="item.i"
              :item="item"
              :active="item === currentItem"
            >
              <chart
                :id="item.i"
                :item="item"
                :theme="screenStyle.theme"
              />
            </item>
          </layout>
        </a-layout-content>
        <a-layout-footer class="data-view-screen-footer">
          <a-slider
            v-model="scale"
            class="data-view-scale"
            :min="20"
            :max="200"
            :marks="{ 100:{} }"
          />
        </a-layout-footer>
      </a-layout>
      <a-layout-sider width="400" class="data-view-option-panel">
        <div v-if="currentItem === null" class="data-view-screen-option">
          <a-form :model="screenStyle" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14}">
            <a-form-item label="大屏标题">
              <a-input v-model="screenStyle.title" />
            </a-form-item>
            <a-form-item label="画板宽度">
              <a-input-number v-model="screenStyle.width" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="画板高度">
              <a-input-number v-model="screenStyle.height" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="背景图">
              <a-select v-model="screenStyle.backgroundImg">
                <a-select-option
                  v-for="image in backgroundImgList"
                  :key="image.image_path"
                  :value="image.image_path"
                >
                  {{ image.image_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
        <chart-option v-else class="data-view-chart-option" :data-source-list="dataSourceList" />
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import { menus } from '../config/menu-pro'
import OptionConfigMap from '@/components/DataView/components/config'
import Layout from '@/components/DataView/layout-pro/layout'
import Item from '@/components/DataView/layout-pro/item'
import Chart from '@/components/DataView/common-pro/chart'
import Layer from '@/components/DataView/common-pro/layer'
import ChartOption from '@/components/DataView/common-pro/chart-option'
import { getDataSourceList } from '@/api/dataSource'
import { getImageList } from '@/api/image'
import { getDataView } from '@/api/dataView'

export default {
  name: 'Index',
  components: {
    Layout,
    Item,
    Chart,
    Layer,
    ChartOption
  },
  data() {
    return {
      menus,
      loading: true,
      instanceId: null,
      isCopy: null,
      startIndex: 0,
      dataSourceList: [],
      backgroundImgList: [],
      instanceVersion: 1
    }
  },
  computed: {
    scale: {
      get() {
        return this.$store.state.canvasStyle.scale * 100
      },
      set(val) {
        this.$store.commit('setCanvasScale', val)
      }
    },
    screenStyle: {
      get() {
        return this.$store.state.screenStyle
      },
      set(val) {
        this.$store.commit('setScreenStyle', val)
      }
    },
    ...mapState([
      'canvasStyle',
      'charts',
      'currentItem'
    ])
  },
  watch: {
  },
  created() {
    // 初始化页面选项
    this.getDataSourceList()
    this.getImageList()
    const instanceId = this.$route.params.instance_id
    const isCopy = this.$route.params.is_copy
    if (instanceId) {
      this.instanceId = parseInt(instanceId)
      this.isCopy = parseInt(isCopy)
      this.getDataView(instanceId)
    } else {
      // 初始化默认缩放比例
      this.$store.commit('autoCanvasScale')
    }
  },
  mounted() {
  },
  methods: {
    handleDragStart(event, key) {
      event.dataTransfer.setData('key', key)
    },
    handleDragOver(event) {
      event.preventDefault()
    },
    handleDrop(event) {
      const key = event.dataTransfer.getData('key')
      const newItem = OptionConfigMap[key]()
      newItem.i = 'chart' + this.startIndex
      newItem.x = event.offsetX - newItem.width / 2
      newItem.y = event.offsetY - newItem.height / 2
      this.$store.commit('addItem', newItem)
      this.startIndex += 1
      console.groupEnd()
    },
    handleItemUnChoose() {
      this.$store.commit('setCurrentItem', null)
    },
    async getDataSourceList() {
      const response = await getDataSourceList()
      this.dataSourceList = response.data
    },
    async getImageList() {
      const response = await getImageList()
      this.backgroundImgList = response.data
    },
    async getDataView(instanceId) {
      try {
        const response = await getDataView(instanceId)
        // 渲染大屏数据
        this.startIndex = response.data.start_index
        this.screenStyle.title = response.data.instance_title
        this.screenStyle.width = response.data.instance_width
        this.screenStyle.height = response.data.instance_height
        this.screenStyle.backgroundImg = response.data.instance_background_img
        this.$store.commit('autoCanvasScale')
        // 渲染图表数据
        const items = response.data.chart_items
        if (items !== null && items !== undefined && items.length > 0) {
          items.map((item) => {
            item.data = JSON.parse(item.data)
            item.chartData = JSON.parse(item.chartData)
            item.option = JSON.parse(item.option)
            return item
          })
          this.instanceVersion = response.data.instance_version
          await this.$store.dispatch('setCharts', items)
        }
      } catch (e) {
        console.log('获取大屏信息或解析大屏信息失败', e)
      }
    }
  }
}
</script>
<style lang="less">
@import "index.less";
</style>
