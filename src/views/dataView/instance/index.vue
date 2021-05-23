<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
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
          <span slot="title">{{ menu.title }}<a-icon type="caret-down" style="margin-left: 5px" /></span>
          <a-menu-item v-for="child in menu.children" :key="child.key" :draggable="true" @dragstart="dragItem($event, child.key)">
            <icon :type="child.icon" />
            <span>{{ child.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <a-space class="data-view-handler">
        <a-button type="primary" size="small" @click="handleSave">保存</a-button>
        <a-button v-if="Object.keys(chooseItem).length >= 0" type="primary" size="small" @click="chooseItem = {}">画板设置</a-button>
        <a-button type="primary" size="small" @click="previewScreen">预览</a-button>
        <a-button type="primary" size="small" @click="previewDebug">调试</a-button>
      </a-space>
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
            :background-img="'url(' + panelConfig.backgroundImg + ')'"
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
      <div class="data-view-option">
        <div v-show="Object.keys(chooseItem).length === 0" class="data-view-option-panel">
          <a-form :model="panelConfig" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14}">
            <a-form-item label="大屏标题">
              <a-input v-model="panelConfig.title" />
            </a-form-item>
            <a-form-item label="画板宽度">
              <a-input-number v-model="panelConfig.panelWidth" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="画板高度">
              <a-input-number v-model="panelConfig.panelHeight" :min="1" :step="10" />
            </a-form-item>
            <a-form-item label="背景色">
              <a-input v-model="panelConfig.backgroundColor" type="color" />
            </a-form-item>
            <a-form-item label="背景图">
              <a-select v-model="panelConfig.backgroundImg">
                <a-select-option
                  v-for="backgroundImg in backgroundImgList"
                  :key="backgroundImg.image_path"
                  :value="backgroundImg.image_path"
                >
                  {{ backgroundImg.image_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
        <chart-option
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
import OptionConfigMap from '@/components/DataView/components/config'
import VLoading from '@/components/Loading/loading-modal'

import { getImageList } from '@/api/image'
import { getDataSourceList } from '@/api/dataSource'
import { getDataView } from '@/api/dataView'

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
      backgroundImgList: [],
      panelConfig: {
        title: '',
        // panelWidth: 1920,
        panelWidth: 1425,
        // panelHeight: 1080,
        panelHeight: 842,
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
    this.getDataSourceList()
    this.getImageList()
    const instanceId = this.$route.params.instance_id
    const isCopy = this.$route.params.is_copy
    this.initPageStyle()
    if (instanceId) {
      this.instanceId = instanceId + ''
      this.isCopy = parseInt(isCopy)
      this.getDataView(instanceId)
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
      console.log('图表ID', this.startIndex)
      console.log('图表位置', 'x: ', event.offsetX, 'y: ', event.offsetY)
      const newItem = OptionConfigMap[key]()
      newItem.slice_id = this.startIndex
      newItem.i = 'chart' + this.startIndex
      newItem.x = event.offsetX - newItem.width / 2
      newItem.y = event.offsetY - newItem.height / 2
      this.slices.push(newItem)
      // this.$set(this.slices, this.startIndex, newItem)
      this.startIndex += 1
      console.groupEnd()
    },
    initPageStyle() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // this.panelConfig.panelWidth = width - 450 - 20 * 2 - 5
      // this.panelConfig.panelHeight = height - 50 - 20 * 2 - 5
      console.log('自动初始化', width, height)
    },
    getDataSourceList() {
      getDataSourceList().then(response => {
        this.dataSourceList = response.data
      })
    },
    getImageList() {
      getImageList().then(response => {
        this.backgroundImgList = response.data
      })
    },
    getDataView(instanceId) {
      console.group('初始化获取可视化大屏信息')
      console.log('初始化获取可视化大屏信息')
      try {
        getDataView(instanceId).then(response => {
          console.log('获取大屏信息返回值', response.data)
        })
      } catch (e) {
        console.log('获取大屏信息或解析大屏信息失败', e)
      } finally {
        console.groupEnd()
      }
    },
    handleLayoutUpdated(layout) {
      this.slices = this.slices.map((item) => {
        if (item.i === layout.id) {
          item.x = layout.x
          item.y = layout.y
        }
        return item
      })
    },
    handleSizeUpdate(size) {
      this.slices = this.slices.map((item) => {
        if (item.i === size.id) {
          item.width = size.w
          item.height = size.h
        }
        return item
      })
    },
    handleItemChoose(item) {
      // 此处应该显示对应的Options
      // 对应类别显示，数据则从数组里面取
      this.chooseItem = item
    },
    handleSave() {
    },
    previewScreen() {
    },
    previewDebug() {
      console.log(JSON.stringify(this.slices))
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
      width: calc(100% - 450px);
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        background-color: #909090;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #909090;
      }

      &::-webkit-scrollbar-track {
        background-color: #fff;
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
                outline: 1px solid #DCDEE3;
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
                outline: 1px solid #DCDEE3;
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
      width: 450px;
      height: 100%;
      overflow: auto;
      border-left: #e2e2e2 1px solid;

      &::-webkit-scrollbar {
        display: none;
      }

      .data-view-option-panel {
        .ant-form {
          padding: 20px;

          .ant-form-item-label {
            padding: 0 10px 0 0 !important;
          }
        }
      }
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
    color: #ffffff!important;
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
