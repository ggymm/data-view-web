<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-panel key="轮播配置" header="轮播配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="是否滚动">
            <a-switch v-model="item.option.carousel.show" checked-children="显示" un-checked-children="不显示" />
          </a-form-item>
          <a-form-item label="显示行数">
            <a-input-number v-model="item.option.carousel.rowNum" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="轮播速度">
            <a-input-number v-model="item.option.carousel.speed" :min="0" :precision="0" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="列配置" header="列配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <div v-for="(c, i) in item.option.column" :key="i">
            <a-form-item :label="'宽度占比-' + i">
              <a-input-number v-model="c.width" :min="0" :precision="0" />
            </a-form-item>
            <a-form-item :label="'表头对齐-' + i">
              <a-select v-model="item.option.header.textAlign[i]">
                <a-select-option
                  v-for="position in positionList"
                  :key="position.value"
                  :value="position.value"
                >
                  {{ position.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="'表体对齐-' + i">
              <a-select v-model="item.option.body.textAlign[i]">
                <a-select-option
                  v-for="position in positionList"
                  :key="position.value"
                  :value="position.value"
                >
                  {{ position.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form>
      </a-collapse-panel>
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
          <a-form-item label="字号">
            <a-input-number v-model="item.option.header.fontSize" :min="0" :precision="0" />
          </a-form-item>
          <div v-for="(h, i) in item.option.header.data" :key="i">
            <a-form-item v-if="item.option.header.show" :label="'标题-' + i">
              <a-input v-model="item.option.header.data[i]" />
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
          <a-form-item label="字号">
            <a-input-number v-model="item.option.body.fontSize" :min="0" :precision="0" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { positionList } from '@/components/DataView/common/common'

export default {
  name: 'CarouselListOption',
  components: {
  },
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
      positionList
    }
  }
}
</script>
