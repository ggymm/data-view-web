<!--suppress JSUnresolvedVariable -->
<template>
  <div class="data-view-container">
    <v-loading v-show="loading" />
    <div class="data-view-header">
      <a-menu
        class="data-view-menu"
        mode="horizontal"
        theme="dark"
        :selectable="false"
        :sub-menu-close-delay="0"
      >
        <a-sub-menu v-for="menu in menus" :key="menu.key">
          <span slot="title" class="submenu-title-wrapper">{{ menu.title }}</span>
          <a-menu-item v-for="child in menu.children" :key="child.key">
            <icon :type="child.icon" />
            <span :draggable="true" @dragstart="dragItem($event, child.key)">{{ child.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <div class="data-view-handler">
        <a-button type="primary" @click="handleSave">保存</a-button>
        <a-button v-if="Object.keys(chooseItem).length >= 0" type="info" @click="chooseItem = {}">画板设置</a-button>
        <a-button type="success" @click="previewScreen">预览</a-button>
        <a-button type="success" @click="debugMethod">调试接口</a-button>
      </div>
    </div>
    <div class="data-view-main">
      <div class="data-view-panel">
        <div
          class="data-view-screen"
          :style="{width: panelConfig.panelWidth + 40 + 'px', height: panelConfig.panelHeight + 40 + 'px'}"
          @dragover="allowItemDrop"
          @drop="itemDrop($event)"
        >
          <layout
            :background-color="panelConfig.backgroundColor"
            :background-img="panelConfig.backgroundImg"
            @layoutUpdated="handleLayoutUpdated"
            @sizeUpdate="handleSizeUpdate"
          >
            <item
              v-for="item in slices"
              :key="item.slice_id"
              :x.sync="item.x"
              :y.sync="item.y"
              :width.sync="item.width"
              :height.sync="item.height"
              :i="item.i"
              :panel-width="panelConfig.panelWidth"
              :panel-height="panelConfig.panelHeight"
              drag-allow-from=".chart,.data-view-item"
              drag-ignore-from=""
            >
              <Slice
                :id="item.i"
                :item="item"
                :theme="panelConfig.instanceTheme"
                @transferHandleItemChoose="handleItemChoose(item)"
              />
            </item>
          </layout>
        </div>
      </div>
      <div class="data-view-option">
        <ChartOption
          v-show="Object.keys(chooseItem).length >= 0"
          :data-source-list="dataSourceList"
          :item="chooseItem"
          @handleDeleteItem="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { menus } from './menu'
import Slice from '@/components/DataView/components/common/slice'
import ChartOption from '@/components/DataView/components/common/chart-option'
import Layout from '@/components/DataView/components/layout/layout'
import Item from '@/components/DataView/components/layout/item'
import VLoading from '@/components/Loading/loading-modal'

import OptionConfigMap from '@/components/DataView/config/option-config-map'

import { getImageBgList } from '@/api/dataView'
import { getDataSourceList } from '@/api/dataSource'

export default {
  name: 'Index',
  components: {
    Layout,
    Item,
    Slice,
    ChartOption,
    VLoading
  },
  data() {
    return {
      menus,
      loading: true,
      instanceId: null,
      isCopy: null,
      slices: [],
      startIndex: 0,
      dataSourceList: [],
      panelConfig: {
        title: '',
        // panelWidth: 1920,
        panelWidth: 1400,
        // panelHeight: 1080,
        panelHeight: 843,
        backgroundColor: '#263546',
        backgroundImg: '',
        instanceViewImg: '',
        instanceTheme: '',
        instanceVersion: 1
      },
      chooseItem: {}
    }
  },
  inject: ['reload'],
  created() {
    // 获取对象
    const instanceId = this.$route.params.instance_id
    const isCopy = this.$route.params.is_copy
    this.initPageStyle()
    if (instanceId) {
      this.instanceId = instanceId + ''
      this.isCopy = parseInt(isCopy)
      this.getScreenInstanceParams(instanceId)
    }
    this.loading = false
  },
  methods: {
    dragItem(event, key) {
      event.dataTransfer.setData('key', key)
    },
    allowItemDrop(event) {
      event.preventDefault()
    },
    itemDrop(event) {
      console.group('添加图表')
      const key = event.dataTransfer.getData('key')
      console.log('图表类型', key)
      console.log(event)
      const newItem = OptionConfigMap[key]()
      newItem.slice_id = this.startIndex
      newItem.i = 'chart' + this.startIndex
      this.slices.push(newItem)
      // this.$set(this.slices, this.startIndex, newItem)
      this.startIndex += 1
      console.groupEnd()
    },
    initPageStyle() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      this.panelConfig.panelWidth = width * 0.75 - 20 * 2 - 5
      this.panelConfig.panelHeight = height - 50 - 20 * 2 - 5
    },
    getDataSourceList() {
      getDataSourceList().then(response => {
        this.dataSourceList = response.data
      })
    },
    getImageBgList() {
      getImageBgList().then(response => {
        this.backgroundImgList = response.data
      })
    },
    getScreenInstanceParams(instanceId) {
      // 获取大屏实例信息
      console.log(instanceId)
    },
    handleSave() {

    },
    previewScreen() {

    },
    debugMethod() {

    },
    handleLayoutUpdated() {

    },
    handleSizeUpdate() {

    },
    handleItemChoose() {

    },
    handleDelete() {

    }
  }
}
</script>

<style lang="less">
.data-view-container {
  .vue-resizable-handle {
    display: block;
  }

  .data-view-header {
    .data-view-menu {
      float: left;
      width: 75%;
      height: 50px;
      line-height: 50px;
      background-color: #545c64;

      svg {
        fill: white;
      }
    }

    .data-view-handler {
      position: relative;
      float: right;
      height: 50px;
      line-height: 50px;
      width: 25%;
      background-color: #545c64;
    }
  }

  .data-view-main {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;

    .data-view-panel {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      padding: 0;
      width: 75%;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar-thumb {
        background-color: #909090;
      }

      .data-view-screen {
        padding: 20px;
        position: relative;
        overflow: auto;
        background: rgba(0, 0, 0, 0) url("../../../assets/grid.png") repeat scroll 0 0 / 8px 8px;

        .data-view-container-layout {
          width: 100%;
          height: 100%;
          position: relative;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, .8);
          overflow: hidden;

          .data-view-item {
            .adaptation {
              &.choose {
                border: 1px solid #DCDEE3;
              }

              .chart {
                width: 100%;
                height: 100%;
                margin: 0 auto;
              }
            }

            .slice-wrapper {
              width: 100%;
              height: 100%;

              &.choose {
                border: 1px solid #DCDEE3;
              }

              .chart {
                width: 100%;
                height: 100%;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }

    .data-view-option {
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      padding: 0;
      width: 25%;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .data-view-option-panel {
      }

      .data-view-chart-option {
      }
    }
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

.ant-menu-item {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
