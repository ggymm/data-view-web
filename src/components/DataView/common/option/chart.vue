<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <a-collapse :bordered="false">
    <a-collapse-panel key="自定义配色" header="自定义配色">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="颜色列表">
          <a-select v-model="item.option.color" mode="tags" />
        </a-form-item>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="标题配置" header="标题配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示">
          <a-switch v-model="item.option.title.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <template v-if="item.option.title.show">
          <a-form-item label="内容">
            <a-input v-model="item.option.title.text" />
          </a-form-item>
          <a-form-item label="颜色">
            <a-input v-model="item.option.title.textStyle.color" />
          </a-form-item>
          <a-form-item label="位置(左)">
            <a-select v-model="item.option.title.left">
              <a-select-option
                v-for="position in positionList"
                :key="position.value"
                :value="position.value"
              >
                {{ position.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="位置(上)">
            <a-select v-model="item.option.title.top">
              <a-select-option
                v-for="position in positionTopList"
                :key="position.value"
                :value="position.value"
              >
                {{ position.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
      </a-form>
    </a-collapse-panel>
    <a-collapse-panel key="图例配置" header="图例配置">
      <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
        <a-form-item label="显示">
          <a-switch v-model="item.option.legend.show" checked-children="显示" un-checked-children="不显示" />
        </a-form-item>
        <template v-if="item.option.legend.show">
          <a-form-item label="类型">
            <a-select v-model="item.option.legend.type">
              <a-select-option
                v-for="legendType in legendTypeList"
                :key="legendType.value"
                :value="legendType.value"
              >
                {{ legendType.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="布局">
            <a-select v-model="item.option.legend.orient">
              <a-select-option
                v-for="orient in orientList"
                :key="orient.value"
                :value="orient.value"
              >
                {{ orient.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="位置">
            <a-row :gutter="20">
              <a-col :span="12">
                <a-tooltip :trigger="['focus']" placement="topLeft">
                  <template slot="title">
                    left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
                  </template>
                  <a-input v-model="item.option.legend.left" />
                </a-tooltip>
              </a-col>
              <a-col :span="12">
                <a-tooltip :trigger="['focus']" placement="topLeft">
                  <template slot="title">
                    top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'
                  </template>
                  <a-input v-model="item.option.legend.top" />
                </a-tooltip>
              </a-col>
            </a-row>
            <a-row :gutter="20">
              <a-col :span="12">
                <a-tooltip :trigger="['focus']" placement="topLeft">
                  <template slot="title">
                    right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比
                  </template>
                  <a-input v-model="item.option.legend.right" />
                </a-tooltip>
              </a-col>
              <a-col :span="12">
                <a-tooltip :trigger="['focus']" placement="topLeft">
                  <template slot="title">
                    bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比
                  </template>
                  <a-input v-model="item.option.legend.bottom" />
                </a-tooltip>
              </a-col>
            </a-row>
          </a-form-item>
        </template>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { positionList, positionTopList, legendTypeList, orientList } from '../common'

export default {
  name: 'CommonChartOption',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      positionList,
      positionTopList,
      legendTypeList,
      orientList
    }
  }
}
</script>
