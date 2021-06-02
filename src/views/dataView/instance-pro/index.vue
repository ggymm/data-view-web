<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <a-layout class="data-view-container">
    <a-layout-header>
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
    <a-layout>
      <a-layout-sider width="200">
        <layer />
      </a-layout-sider>
      <a-layout class="data-view-screen">
        <a-layout-content ref="">
          <div
            class="data-view-screen-wrapper"
            :style="screenWrapperStyle()"
          >
            <layout
              :scale="scale"
              :panel-width="panelConfig.panelWidth"
              :panel-height="panelConfig.panelHeight"
              :background-img="'url(' + imageBasicUrl + panelConfig.backgroundImg + ')'"
              @dragover.native="handleDragOver"
              @drop.native="handleDrop"
            >
              <item
                v-for="item in slices"
                :key="item.slice_id"
                :i="item.i"
                :style="itemStyle(item)"
              >
                <chart
                  :id="item.i"
                  :item="item"
                  :theme="panelConfig.instanceTheme"
                  @transferHandleItemChoose="handleItemChoose(item)"
                />
              </item>
            </layout>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <a-slider
            v-model="scale"
            class="data-view-scale"
            :min="1"
            :max="200"
            :marks="{ 50: {}, 100:{}, 150:{} }"
          />
        </a-layout-footer>
      </a-layout>
      <a-layout-sider width="400">
        配置项
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script>
import { menus } from '../config/menu'
import defaultSettings from '@/config'
import OptionConfigMap from '@/components/DataView/components/config'
import Layout from '@/components/DataView/layout-pro/layout'
import Item from '@/components/DataView/layout-pro/item'
import Chart from '@/components/DataView/common/chart'
import Layer from '@/components/DataView/common/layer'

export default {
  name: 'Index',
  components: {
    Layout,
    Item,
    Chart,
    Layer
  },
  data() {
    return {
      menus,
      imageBasicUrl: defaultSettings.imageBasicUrl,
      loading: true,
      instanceId: null,
      isCopy: null,
      slices: [],
      startIndex: 0,
      dataSourceList: [],
      backgroundImgList: [],
      scale: 100,
      panelConfig: {
        title: '',
        panelWidth: 1920,
        panelHeight: 1080,
        backgroundColor: '#263546',
        backgroundImg: '/storage/2021/0531/通用模板1-背景.png',
        instanceTheme: '',
        instanceVersion: 1
      },
      chooseItem: {}
    }
  },
  methods: {
    screenWrapperStyle() {
      return {
        width: `${this.panelConfig.panelWidth * this.scale / 100 + 100}px`,
        height: `${this.panelConfig.panelHeight * this.scale / 100 + 100}px`
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
    debug() {
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
      this.slices.push(newItem)
      this.startIndex += 1
      console.groupEnd()
    },
    handleMouseDown() {

    },
    deselectCurComponent() {

    },
    handleItemChoose(item) {
      // 此处应该显示对应的Options
      // 对应类别显示，数据则从数组里面取
      this.chooseItem = item
    }
  }
}
</script>
<style lang="less">
@import "index.less";
</style>
