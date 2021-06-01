<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-container">
    <div class="data-view-header">
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
      <a-space class="data-view-handler" />
    </div>
    <div class="data-view-main">
      <div class="data-view-layer" />
      <div class="data-view-screen">
        <div
          class="data-view-layout-container"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <layout
            :background-color="panelConfig.backgroundColor"
            :background-img="'url(' + imageBasicUrl + panelConfig.backgroundImg + ')'"
            :panel-width="panelConfig.panelWidth"
            :panel-height="panelConfig.panelHeight"
          >
            <item
              v-for="item in slices"
              :key="item.slice_id"
              :i="item.i"
              :style="getItemStyle(item)"
            >
              <slice
                :id="item.i"
                :item="item"
                :theme="panelConfig.instanceTheme"
                @transferHandleItemChoose="handleItemChoose(item)"
              />
            </item>
          </layout>
        </div>
      </div>
      <div class="data-view-option" />
    </div>
  </div>
</template>

<script>
import { menus } from '../config/menu'
import defaultSettings from '@/config'
import OptionConfigMap from '@/components/DataView/components/config'
import Layout from '@/components/DataView/layout-pro/layout'
import Item from '@/components/DataView/layout-pro/item'
import Slice from '@/components/DataView/common/slice'

export default {
  name: 'Index',
  components: {
    Layout,
    Item,
    Slice
  },
  data() {
    return {
      menus,
      imageBasicUrl: defaultSettings.imageBasicUrl,
      slices: [],
      startIndex: 0,
      panelConfig: {
        title: '',
        // panelWidth: 1920,
        panelWidth: 1920,
        // panelHeight: 1080,
        panelHeight: 1080,
        backgroundColor: '#263546',
        backgroundImg: null,
        instanceTheme: '',
        instanceVersion: 1
      },
      chooseItem: {}
    }
  },
  methods: {
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
    },
    getItemStyle(item) {
      return {
        left: item.x + 'px',
        top: item.y + 'px',
        width: item.width + 'px',
        height: item.height + 'px'
      }
    }
  }
}
</script>
<style lang="less">
.data-view-container {
  height: 100vh;
  background: #ffffff;

  .data-view-menu {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
  }

  .data-view-main {
    height: calc(100% - 50px);
    position: relative;

    .data-view-layer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 200px;
      padding-top: 10px;
    }

    .data-view-screen {
      margin-left: 200px;
      margin-right: 400px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .data-view-layout-container {
        width: 100%;
        height: 100%;
        overflow: auto;

        .data-view-layout {
          position: relative;
          background: #ffffff;

          .data-view-item {
            z-index: 99;
            position: absolute;

            .slice-wrapper {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .data-view-option {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 400px;
    }
  }
}

.ant-menu-item {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.data-view-menu {
  .ant-menu-submenu {
    &:hover {
      color: #ffffff !important;
    }
  }

  .ant-menu-submenu-open {
    color: #ffffff !important;
  }
}

.ant-menu-submenu {
  svg {
    fill: white;
  }
}

.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
  background-color: #545c64;
}
</style>
