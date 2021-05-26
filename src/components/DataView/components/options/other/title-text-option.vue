<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option two">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="文本配置" header="文本配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="文本内容">
                <a-input v-model="item.option.title" />
              </a-form-item>
              <a-form-item label="文本颜色">
                <a-input v-model="item.option.fontColor" type="color" />
              </a-form-item>
              <a-form-item label="文本字体">
                <a-input-number v-model="item.option.fontSize" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="文本高度">
                <a-input-number v-model="item.option.height" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="文本加粗">
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
              <a-form-item label="文本位置">
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
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="position" tab="位置">
        <common-position-option :item="item" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonPositionOption from '../common/common-position-option'
import { fontWeightList, positionList } from '../common'

export default {
  name: 'TitleTextOption',
  components: {
    CommonPositionOption
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
