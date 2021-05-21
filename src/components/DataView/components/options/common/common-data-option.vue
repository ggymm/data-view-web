<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
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
    <div v-if="item.chartData.dataSourceType === 'DataBase'">
      <a-form-item v-for="(param, index) in params" :key="index" :label="param.label">
        <a-input v-model="item.chartData[param.value]" />
      </a-form-item>
    </div>
    <a-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="SQL">
      <a-textarea v-model="item.chartData.sql" />
    </a-form-item>
  </a-form>
</template>

<script>
import { dataSourceTypeList } from '../common'

export default {
  name: 'CommonDataOption',
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
    },
    params: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dataSourceTypeList
    }
  }
}
</script>

<style scoped>

</style>
