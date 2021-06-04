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
            <icon :type="child.icon" />
            <span>{{ child.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout class="data-view-main">
      <a-layout-sider width="200" class="data-view-layer">
        <layer />
      </a-layout-sider>
      <a-layout class="data-view-screen">
        <a-layout-content
          ref="screenWrapper"
          class="data-view-screen-wrapper"
          @mousedown.stop="handleItemUnChoose"
        >
          <div :style="screenWrapperStyle()">
            <layout @dragover.native="handleDragOver" @drop.native="handleDrop">
              <item
                v-for="item in charts"
                :key="item.slice_id"
                :item="item"
                :active="item === currentItem"
                :style="itemStyle(item)"
              >
                <chart
                  :id="item.i"
                  :item="item"
                  :theme="panelConfig.instanceTheme"
                />
              </item>
            </layout>
          </div>
        </a-layout-content>
        <a-layout-footer class="data-view-screen-footer">
          <a-slider
            v-model="scale"
            class="data-view-scale"
            :min="20"
            :max="200"
            :marks="{ 50: {}, 100:{}, 150:{} }"
          />
        </a-layout-footer>
      </a-layout>
      <a-layout-sider width="400" class="data-view-option-panel">
        <div v-if="currentItem === null" class="data-view-screen-option">
          <a-form :model="panelConfig" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14}">
            <a-form-item label="大屏标题">
              <a-input v-model="panelConfig.title" />
            </a-form-item>
            <a-form-item label="画板宽度">
              <a-input-number v-model="panelStyle.width" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="画板高度">
              <a-input-number v-model="panelStyle.height" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="背景色">
              <a-input v-model="panelConfig.backgroundColor" type="color" />
            </a-form-item>
            <a-form-item label="背景图">
              <a-select v-model="panelStyle.backgroundImg">
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
        <chart-option
          v-else
          class="data-view-chart-option"
          :data-source-list="dataSourceList"
          :item="currentItem"
          @handleDeleteItem="handleDelete"
        />
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'

import { menus } from '../config/menu'
import OptionConfigMap from '@/components/DataView/components/config'
import Layout from '@/components/DataView/layout-pro/layout'
import Item from '@/components/DataView/layout-pro/item'
import Chart from '@/components/DataView/common/chart'
import Layer from '@/components/DataView/common/layer'
import ChartOption from '@/components/DataView/common/chart-option'
import { getDataSourceList } from '@/api/dataSource'
import { getImageList } from '@/api/image'

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
      scale: 20,
      panelConfig: {
        title: '',
        instanceTheme: '',
        instanceVersion: 1
      }
    }
  },
  computed: {
    panelStyle: {
      get() {
        return this.$store.state.panelStyle
      },
      set(value) {
        this.$store.commit('setPanelStyle', value)
      }
    },
    ...mapState([
      'charts',
      'currentItem'
    ])
  },
  created() {
    // 初始化页面选项
    this.getDataSourceList()
    this.getImageList()
  },
  mounted() {
    // 初始化默认缩放比例
    this.autoScale()
  },
  methods: {
    autoScale() {
      debugger
      console.group('自动设置缩放')
      let width = this.$refs.screenWrapper.$el.clientWidth
      let height = this.$refs.screenWrapper.$el.clientHeight
      console.log('wrapper实际大小', width, height)
      width = width - 100
      height = height - 100
      console.log('wrapper去除边框后大小', width, height)
      this.scale = this.$store.state.scale
      if ((this.panelStyle.width / this.panelStyle.height) >= (width / height)) {
        this.scale = width / this.panelStyle.width * 100
      } else {
        this.scale = height / this.panelStyle.height * 100
      }
      console.log('设置最佳缩放值', this.scale)
      this.$store.commit('setScale', this.scale)
      console.groupEnd()
    },
    screenWrapperStyle() {
      return {
        width: `${this.panelStyle.width * this.scale / 100 + 100}px`,
        height: `${this.panelStyle.height * this.scale / 100 + 100}px`
      }
    },
    itemStyle(item) {
      return {
        left: item.x + 'px',
        top: item.y + 'px',
        width: item.width + 'px',
        height: item.height + 'px'
      }
    },
    handleDragStart(event, key) {
      event.dataTransfer.setData('key', key)
    },
    handleDragOver(event) {
      event.preventDefault()
    },
    handleDrop(event) {
      console.group('添加图表')
      const key = event.dataTransfer.getData('key')
      console.log('图表类型', key)
      console.log('图表ID', this.startIndex)
      console.log('图表位置', 'x: ', event.offsetX, 'y: ', event.offsetY)
      const newItem = OptionConfigMap[key]()
      newItem.slice_id = this.startIndex
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
    handleDelete() {
    },
    async getDataSourceList() {
      const response = await getDataSourceList()
      this.dataSourceList = response.data
    },
    async getImageList() {
      const response = await getImageList()
      this.backgroundImgList = response.data
    }
  }
}
</script>
<style lang="less">
@import "index.less";
</style>
