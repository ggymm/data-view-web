<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option two">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <a-collapse :bordered="false" :accordion="true">
          <a-collapse-panel key="位置配置" header="位置配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="距离左侧">
                <a-input-number v-model="item.x" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="距离顶部">
                <a-input-number v-model="item.y" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="宽度">
                <a-input-number v-model="item.width" :min="0" :precision="0" />
              </a-form-item>
              <a-form-item label="高度">
                <a-input-number v-model="item.height" :min="0" :precision="0" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="颜色配置" header="颜色配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="颜色">
                <a-select v-model="item.option.color" mode="tags" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="标题配置" header="标题配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示标题">
                <a-switch v-model="item.option.title.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <a-form-item v-if="item.option.title.show" label="图表标题">
                <a-input v-model="item.option.title.text" />
              </a-form-item>
              <a-form-item v-if="item.option.title.show" label="标题颜色">
                <a-input v-model="item.option.title.textStyle.color" type="color" />
              </a-form-item>
              <a-form-item v-if="item.option.title.show" label="标题位置">
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
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="图例配置" header="图例配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
          </a-collapse-panel>
          <a-collapse-panel key="网格配置" header="网格配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="上">
                <a-input v-model="item.option.grid.top" />
              </a-form-item>
              <a-form-item label="下">
                <a-input v-model="item.option.grid.bottom" />
              </a-form-item>
              <a-form-item label="左">
                <a-input v-model="item.option.grid.left" />
              </a-form-item>
              <a-form-item label="右">
                <a-input v-model="item.option.grid.right" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="横坐标轴设置" header="横坐标轴设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="显示坐标轴">
                <a-switch v-model="item.option.xAxis.show" checked-children="显示" un-checked-children="不显示" />
              </a-form-item>
              <div v-if="item.option.xAxis.show">
                <a-form-item label="坐标轴名称">
                  <a-input v-model="item.option.xAxis.name" />
                </a-form-item>
                <a-form-item label="显示坐标轴线">
                  <a-switch v-model="item.option.xAxis.axisLine.show" checked-children="显示" un-checked-children="不显示" />
                </a-form-item>
                <a-form-item v-if="item.option.xAxis.axisLine.show" label="坐标轴线颜色">
                  <a-input v-model="item.option.xAxis.axisLine.lineStyle.color" type="color" />
                </a-form-item>
                <a-form-item label="显示坐标轴标签">
                  <a-switch v-model="item.option.xAxis.axisLabel.show" checked-children="显示" un-checked-children="不显示" />
                </a-form-item>
                <a-form-item v-if="item.option.xAxis.axisLabel.show" label="标签字体颜色">
                  <a-input v-model="item.option.xAxis.axisLabel.color" type="color" />
                </a-form-item>
                <a-form-item v-if="item.option.xAxis.axisLabel.show" label="标签旋转角度">
                  <a-input-number v-model="item.option.xAxis.axisLabel.rotate" :min="-90" :max="90" />
                </a-form-item>
                <a-form-item label="显示分割线">
                  <a-switch v-model="item.option.xAxis.splitLine.show" checked-children="显示" un-checked-children="不显示" />
                </a-form-item>
                <a-form-item v-if="item.option.xAxis.splitLine.show" label="分割线颜色">
                  <a-select v-model="item.option.xAxis.splitLine.lineStyle.color" mode="tags" />
                </a-form-item>
              </div>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="纵坐标轴设置" header="纵坐标轴设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" />
          </a-collapse-panel>
          <a-collapse-panel key="折线设置" header="折线设置">
            <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="是否平滑">
                <a-space>
                  <a-switch
                    v-for="series in item.option.series"
                    :key="series.name"
                    v-model="series.smooth"
                    checked-children="平滑"
                    un-checked-children="不平滑"
                  />
                </a-space>
              </a-form-item>
              <a-form-item label="是否显示符号">
                <a-space>
                  <a-switch
                    v-for="series in item.option.series"
                    :key="series.name"
                    v-model="series.showSymbol"
                    checked-children="显示"
                    un-checked-children="不显示"
                  />
                </a-space>
              </a-form-item>
              <a-form-item label="折线类型">
                <a-select
                  v-for="series in item.option.series"
                  :key="series.name"
                  v-model="series.lineStyle.type"
                >
                  <a-select-option
                    v-for="lineType in lineTypeList"
                    :key="lineType.value"
                    :value="lineType.value"
                  >
                    {{ lineType.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="区域颜色">
                <a-input
                  v-for="series in item.option.series"
                  :key="series.name"
                  v-model="series.areaStyle.color"
                  type="color"
                />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="data" tab="数据">
        <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="数据源类型">
            <a-select v-model="item.chartData.dataSourceType">
              <a-select-option
                v-for="dataSourceType in dataSourceTypeList"
                :key="dataSourceType.value"
                :value="dataSourceType.value"
              >
                {{ dataSourceType.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="数据源">
            <a-select v-model="item.chartData.database">
              <a-select-option
                v-for="dataSource in dataSourceList"
                :key="dataSource.data_source_id"
                :value="dataSource.data_source_id"
              >
                {{ dataSource.data_source_name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="分类字段">
            <a-input v-model="item.chartData.legend" />
          </a-form-item>
          <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="x轴字段">
            <a-input v-model="item.chartData.name" />
          </a-form-item>
          <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="y轴字段">
            <a-input v-model="item.chartData.value" />
          </a-form-item>
          <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="SQL">
            <a-textarea v-model="item.chartData.sql" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { refreshList, dataSourceTypeList, lineTypeList, positionList, orientList } from '../common'

export default {
  name: 'LineNormalOption',
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
      refreshList,
      dataSourceTypeList,
      lineTypeList,
      positionList,
      orientList
    }
  },
  methods: {
    handleDelete() {
    },
    handleEditSql() {
      this.$emit('handleEditSql', this.item.chartData.sql)
    },
    handleEditOption() {
      this.$emit('handleEditOption', this.item.option)
    }
  }
}
</script>
