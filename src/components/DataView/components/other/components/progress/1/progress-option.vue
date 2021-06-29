<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
      <a-form-item label="类型">
        <a-select v-model="item.option.type">
          <a-select-option
            v-for="progressType in progressTypeList"
            :key="progressType.value"
            :value="progressType.value"
          >
            {{ progressType.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="显示信息">
        <a-switch v-model="item.option.showInfo" checked-children="显示" un-checked-children="不显示" />
      </a-form-item>
      <template v-if="item.option.showInfo">
        <a-form-item label="字号">
          <a-input-number v-model="item.option.info.fontSize" :min="0" :precision="0" />
        </a-form-item>
        <a-form-item label="字体颜色">
          <a-input v-model="item.option.info.color" />
        </a-form-item>
      </template>
      <a-form-item label="宽度">
        <a-input-number v-model="item.option.strokeWidth" :min="0" :precision="0" />
      </a-form-item>
      <a-form-item label="颜色">
        <a-input v-model="item.option.strokeColor" />
      </a-form-item>
      <a-form-item label="边角">
        <a-radio-group v-model="item.option.strokeLinecap">
          <a-radio :style="{height: '35px', lineHeight: '35px'}" :value="'round'">
            <span style="word-break: break-all;white-space: pre-wrap;">圆形</span>
          </a-radio>
          <a-radio :style="{height: '35px', lineHeight: '35px'}" :value="'square'">
            <span style="word-break: break-all;white-space: pre-wrap;">方形</span>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <template v-if="item.option.type === 'circle'">
        <a-form-item label="直径">
          <a-input-number v-model="item.option.width" :min="0" :precision="0" />
        </a-form-item>
      </template>
      <template v-if="item.option.type === 'dashboard'">
        <a-form-item label="缺口位置">
          <a-select v-model="item.option.gapPosition">
            <a-select-option
              v-for="gapPosition in gapPositionList"
              :key="gapPosition.value"
              :value="gapPosition.value"
            >
              {{ gapPosition.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="缺口角度">
          <a-input-number v-model="item.option.gapDegree" :min="0" :max="360" />
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<script>
import { progressTypeList, gapPositionList } from '@/components/DataView/common/common'

export default {
  name: 'ProgressOption',
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
      progressTypeList,
      gapPositionList
    }
  },
  methods: {
  }
}
</script>
