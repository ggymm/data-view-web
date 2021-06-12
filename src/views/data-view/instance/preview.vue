<template>
  <div :style="{width: panelConfig.panelWidth + 'px', height: panelConfig.panelHeight + 'px'}">
    <div class="data-view-preview-container">
      <layout-preview
        :background-color="panelConfig.backgroundColor"
        :background-img="'url(' + imageBasicUrl + panelConfig.backgroundImg + ')'"
      >
        <item-preview
          v-for="item in slices"
          :key="item.slice_id"
          :x="item.x"
          :y="item.y"
          :width="item.width"
          :height="item.height"
          :i="item.i"
          :panel-width="panelConfig.panelWidth"
          :panel-height="panelConfig.panelHeight"
        >
          <slice-preview :id="item.i" :item="item" />
        </item-preview>
      </layout-preview>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/config'
import SlicePreview from '@/components/DataView/common/slice-preview'
import LayoutPreview from '@/components/DataView/layout/layout-preview'
import ItemPreview from '@/components/DataView/layout/item-preview'
import { getDataView } from '@/api/data-view'

export default {
  name: 'Preview',
  components: {
    SlicePreview,
    LayoutPreview,
    ItemPreview
  },
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl,
      slices: [],
      panelConfig: {
        title: '',
        panelWidth: 1425,
        panelHeight: 842,
        backgroundColor: '#263546',
        backgroundImg: null,
        instanceViewImg: null,
        instanceTheme: '',
        instanceVersion: 1
      }
    }
  },
  created() {
    const instanceId = this.$route.params.instance_id
    if (instanceId) {
      this.getDataView(instanceId)
    }
  },
  methods: {
    getDataView(instanceId) {
      console.group('初始化获取可视化大屏信息')
      console.log('初始化获取可视化大屏信息')
      try {
        getDataView(instanceId).then(response => {
          const items = JSON.parse(JSON.stringify(response.data.chart_items))
          if (items !== null && items !== undefined && items.length > 0) {
            items.map((item) => {
              item.data = JSON.parse(item.data)
              item.chartData = JSON.parse(item.chartData)
              item.option = JSON.parse(item.option)
              return item
            })
            const panelConfig = {
              title: response.data.instance_title,
              panelWidth: response.data.instance_width,
              panelHeight: response.data.instance_height,
              backgroundColor: response.data.instance_background_color,
              backgroundImg: response.data.instance_background_img,
              instanceVersion: response.data.instance_version
            }
            this.panelConfig = JSON.parse(JSON.stringify(panelConfig))
            this.slices = JSON.parse(JSON.stringify(items))
          }
        })
      } catch (e) {
        console.log('获取大屏信息或解析大屏信息失败', e)
      } finally {
        console.groupEnd()
      }
    }
  }
}
</script>

<style lang="less">
body {
  overflow: hidden;
}

.data-view-preview-container {
  width: 100%;
  height: 100%;
  position: relative;

  .vue-resizable-handle {
    display: none;
  }

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
</style>
