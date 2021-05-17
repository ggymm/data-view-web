<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="data-view-chart-option">
    <a-tabs default-active-key="style" style="width: 100%;">
      <a-tab-pane key="style" tab="样式">
        Tab1
      </a-tab-pane>
      <a-tab-pane key="data" tab="数据">
        <a-form-model :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-model-item label="数据源类型">
            <a-select v-model="item.chartData.dataSourceType">
              <a-select-option
                v-for="dataSourceType in dataSourceTypeList"
                :key="dataSourceType.value"
                :value="dataSourceType.value"
              >
                {{ dataSourceType.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="item.chartData.dataSourceType === 'DataBase'" label="数据源">
            <a-select v-model="item.chartData.database">
              <a-select-option
                v-for="dataSource in dataSourceList"
                :key="dataSource.data_source_id"
                :value="dataSource.data_source_id"
              >
                {{ dataSource.data_source_name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
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
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
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
      activeName: 'style',
      refreshList: [
        { label: '开启', value: 'true' },
        { label: '关闭', value: 'false' }
      ],
      isShowList: [
        { label: '显示', value: true },
        { label: '隐藏', value: false }
      ],
      dataSourceTypeList: [
        { label: '数据库数据源', value: 'DataBase' },
        { label: 'CSV文件数据源', value: 'CSV' }
      ],
      positionList: [
        { label: '居左', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'right' }
      ],
      orientList: [
        { label: '纵向', value: 'vertical' },
        { label: '横向', value: 'horizontal' }
      ],
      smoothList: [
        { label: '平滑', value: true },
        { label: '不平滑', value: false }
      ],
      fileNameList: []
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
