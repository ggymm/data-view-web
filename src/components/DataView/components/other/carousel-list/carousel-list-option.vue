<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="表头配置" header="表头配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示表头">
                <a-switch v-model="item.option.header.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <a-form-item label="行高">
                <a-input-number v-model="item.option.header.height" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="字体颜色">
                <a-input v-model="item.option.header.fontColor" />
              </a-form-item>
              <a-form-item label="字体大小">
                <a-input-number v-model="item.option.header.fontSize" :min="0" :precision="0" />
              </a-form-item>
              <div v-for="(header, i) in item.option.header.data" :key="i">
                <a-form-item v-if="item.option.header.show" :label="'标题-' + i">
                  <a-input v-model="header.label" />
                </a-form-item>
                <a-form-item :label="'宽度-' + i">
                  <a-input v-model="header.width" />
                </a-form-item>
              </div>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="表体配置" header="表体配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="行高">
                <a-input-number v-model="item.option.body.height" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="字体颜色">
                <a-input v-model="item.option.body.fontColor" />
              </a-form-item>
              <a-form-item label="字体大小">
                <a-input-number v-model="item.option.body.fontSize" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="显示行数">
                <a-input-number v-model="item.option.body.rowNum" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="轮播速度">
                <a-input-number v-model="item.option.body.speed" :min="0" :precision="0" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="common" tab="通用">
        <common-option :item="item" />
      </a-tab-pane>
      <a-tab-pane key="data" tab="数据">
        <common-data-option
          :item="item"
          :data-source-list="dataSourceList"
          :params="params"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonOption from '@/components/DataView/common-option/option'
import CommonDataOption from '@/components/DataView/common-option/data'

export default {
  name: 'CarouselListOption',
  components: {
    CommonOption,
    CommonDataOption
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      fileNameList: [],
      params: []
    }
  }
}
</script>
