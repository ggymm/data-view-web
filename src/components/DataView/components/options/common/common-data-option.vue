<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
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
      <template v-if="item.chartData.dataSourceType === 'DataBase'">
        <a-form-item label="数据源">
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
        <a-form-item v-for="(param, index) in params" :key="index" :label="param.label">
          <a-input v-model="item.chartData[param.value]" />
        </a-form-item>
        <a-form-item label="SQL">
          <a-textarea v-model="item.chartData.sql" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="small" @click="handleEditSQL">调试SQL</a-button>
        </a-form-item>
      </template>
      <template v-else-if="item.chartData.dataSourceType === 'Rest'">
        <a-button type="primary" size="small" @click="handleEditRest">调试API</a-button>
      </template>
      <template v-else-if="item.chartData.dataSourceType === 'Csv'" />
    </a-form>
    <modal-pro
      :title="'SQL编辑器'"
      :visible.sync="visibleSQLModel"
      @confirm="confirmSQL"
      @close="visibleSQLModel = false"
    >
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
      <p>这里是弹窗内容</p>
    </modal-pro>
    <modal-pro
      :title="'API调试器'"
      :visible="visibleRestModel"
      @confirm="confirmSQL"
      @close="visibleRestModel = false"
    >
      这里是弹窗内容
    </modal-pro>
  </div>
</template>

<script>
import ModalPro from '@/components/ModelPro'
import { dataSourceTypeList } from '../common'

export default {
  name: 'CommonDataOption',
  components: {
    ModalPro
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
      dataSourceTypeList,
      visibleSQLModel: false,
      visibleRestModel: false
    }
  },
  methods: {
    handleEditSQL() {
      this.visibleSQLModel = true
    },
    handleEditRest() {
      this.visibleRestModel = true
    },
    confirmSQL(sql) {
    }
  }
}
</script>
