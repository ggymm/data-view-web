<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-panel key="文本配置" header="文本配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="颜色">
            <a-input v-model="item.option.fontColor" />
          </a-form-item>
          <a-form-item label="字号">
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
          <a-form-item label="对齐">
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
          <a-form-item label="千分位分隔符">
            <a-switch v-model="item.option.thousandth" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="前缀配置" header="前缀配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="内容">
            <a-input v-model="item.option.prefix.title" />
          </a-form-item>
          <a-form-item label="颜色">
            <a-input v-model="item.option.prefix.fontColor" />
          </a-form-item>
          <a-form-item label="字号">
            <a-input-number v-model="item.option.prefix.fontSize" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="加粗">
            <a-select v-model="item.option.prefix.fontWeight">
              <a-select-option
                v-for="fontWeigh in fontWeightList"
                :key="fontWeigh.value"
                :value="fontWeigh.value"
              >
                {{ fontWeigh.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="单位配置" header="单位配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="内容">
            <a-input v-model="item.option.unit.title" />
          </a-form-item>
          <a-form-item label="颜色">
            <a-input v-model="item.option.unit.fontColor" />
          </a-form-item>
          <a-form-item label="字号">
            <a-input-number v-model="item.option.unit.fontSize" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="加粗">
            <a-select v-model="item.option.unit.fontWeight">
              <a-select-option
                v-for="fontWeigh in fontWeightList"
                :key="fontWeigh.value"
                :value="fontWeigh.value"
              >
                {{ fontWeigh.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { fontWeightList, positionList } from '@/components/DataView/common/common'

export default {
  name: 'CounterOption',
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
      fontWeightList,
      positionList
    }
  }
}
</script>
