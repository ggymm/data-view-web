<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="two">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="内容">
            <a-input v-model="item.option.title" />
          </a-form-item>
          <a-form-item label="颜色">
            <a-input v-model="item.option.fontColor" />
          </a-form-item>
          <a-form-item label="字体">
            <a-input-number v-model="item.option.fontSize" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="高度">
            <a-input-number v-model="item.option.height" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="加粗">
            <a-select v-model="item.option.fontWeight">
              <a-select-option
                v-for="fontWeigh in fontWeightList"
                :key="fontWeigh.value"
                :value="fontWeigh.value"
              >
                {{ fontWeigh.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="位置">
            <a-select v-model="item.option.textAlign">
              <a-select-option
                v-for="position in positionList"
                :key="position.value"
                :value="position.value"
              >
                {{ position.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="common" tab="通用">
        <common-option :item="item" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonOption from '../common/common-option'
import { fontWeightList, positionList } from '../common'

export default {
  name: 'TitleTextOption',
  components: {
    CommonOption
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
      fontWeightList,
      positionList
    }
  }
}
</script>
