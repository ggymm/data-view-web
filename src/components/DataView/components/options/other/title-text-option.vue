<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option one">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <common-option :item="item" />
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
  },
  methods: {
    handleDelete() {
    }
  }
}
</script>
