<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="three">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false">
          <a-collapse-panel key="全局配置" header="全局配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="对齐方式">
                <a-select v-model="item.option.align">
                  <a-select-option
                    v-for="(position, index) in positionList"
                    :key="index"
                    :value="index"
                  >
                    {{ position.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="标题配置" header="标题配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示">
                <a-switch v-model="item.option.title.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <template v-if="item.option.title.show">
                <a-form-item label="标题内容">
                  <a-input v-model="item.option.title.text" />
                </a-form-item>
                <a-form-item label="间距">
                  <a-input-number v-model="item.option.title.margin" :min="0" :precision="0" />
                </a-form-item>
                <a-form-item label="排列方式">
                  <a-select v-model="item.option.title.position">
                    <a-select-option
                      v-for="titlePosition in titlePositionList"
                      :key="titlePosition.value"
                      :value="titlePosition.value"
                    >
                      {{ titlePosition.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="颜色">
                  <a-input v-model="item.option.title.fontColor" />
                </a-form-item>
                <a-form-item label="字号">
                  <a-input-number v-model="item.option.title.fontSize" :min="0" :precision="0" />
                </a-form-item>
                <a-form-item label="加粗">
                  <a-select v-model="item.option.title.fontWeight">
                    <a-select-option
                      v-for="fontWeigh in fontWeightList"
                      :key="fontWeigh.value"
                      :value="fontWeigh.value"
                    >
                      {{ fontWeigh.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </template>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="数字样式配置" header="数字样式配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="颜色">
                <a-input v-model="item.option.number.fontColor" />
              </a-form-item>
              <a-form-item label="字体">
                <a-select v-model="item.option.number.fontFamily">
                  <a-select-option
                    v-for="fontFamily in fontFamilyList"
                    :key="fontFamily.value"
                    :value="fontFamily.value"
                  >
                    {{ fontFamily.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="字号">
                <a-input-number v-model="item.option.number.fontSize" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="加粗">
                <a-select v-model="item.option.number.fontWeight">
                  <a-select-option
                    v-for="fontWeigh in fontWeightList"
                    :key="fontWeigh.value"
                    :value="fontWeigh.value"
                  >
                    {{ fontWeigh.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="间隔">
                <a-input-number v-model="item.option.number.space" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="背景图" />
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="数字格式配置" header="数字格式配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="小数位数">
                <a-input-number v-model="item.option.number.decimal" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="分隔符号">
                <a-input v-model="item.option.number.decimalSep" />
              </a-form-item>
              <a-form-item label="千分位分隔符">
                <a-switch v-model="item.option.number.thousandth" />
              </a-form-item>
              <a-form-item label="分隔符号">
                <a-input v-model="item.option.number.thousandthSep" />
              </a-form-item>
              <a-form-item label="补零位数">
                <a-input-number v-model="item.option.number.digit" :min="0" :precision="0" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="前缀配置" header="前缀配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示">
                <a-switch v-model="item.option.prefix.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <template v-if="item.option.prefix.show">
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
              </template>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="后缀配置" header="后缀配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示">
                <a-switch v-model="item.option.suffix.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <template v-if="item.option.suffix.show">
                <a-form-item label="内容">
                  <a-input v-model="item.option.suffix.title" />
                </a-form-item>
                <a-form-item label="颜色">
                  <a-input v-model="item.option.suffix.fontColor" />
                </a-form-item>
                <a-form-item label="字号">
                  <a-input-number v-model="item.option.suffix.fontSize" :min="0" :precision="0" />
                </a-form-item>
                <a-form-item label="加粗">
                  <a-select v-model="item.option.suffix.fontWeight">
                    <a-select-option
                      v-for="fontWeigh in fontWeightList"
                      :key="fontWeigh.value"
                      :value="fontWeigh.value"
                    >
                      {{ fontWeigh.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </template>
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
import { positionList, titlePositionList, fontWeightList, fontFamilyList } from '@/components/DataView/common-option/common'

export default {
  name: 'CounterOption',
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
      params: [
        {
          'label': '数据字段',
          'value': 'value'
        }
      ],
      positionList,
      titlePositionList,
      fontWeightList,
      fontFamilyList
    }
  }
}
</script>
