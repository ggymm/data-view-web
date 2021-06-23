<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div class="chart-data-option">
    <a-form :model="item" layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
      <a-form-item label="数据源类型">
        <a-select v-model="item.chartData.dataSourceType" @change="handleConfigChange">
          <a-select-option
            v-for="dataSourceType in dataSourceTypeList"
            :key="dataSourceType.value"
            :value="dataSourceType.value"
          >
            {{ dataSourceType.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="item.chartData.dataSourceType === 'Static'">
        <code-editor
          ref="staticData"
          language="json"
          :value="item.chartData.staticData"
          @change="handleStaticDataChange"
          @blur="handleConfigChange"
        >
          <icon class="fullscreen" type="icon-fullscreen-expand" @click="visibleStaticDataModel = true" />
        </code-editor>
      </template>
      <template v-else-if="item.chartData.dataSourceType === 'DataBase'">
        <a-form-item label="数据源">
          <a-select v-model="item.chartData.database" @change="handleConfigChange">
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
          <a-input v-model="item.chartData[param.value]" @change="handleConfigChange" />
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
      :title="'静态数据'"
      :visible.sync="visibleStaticDataModel"
      :width="'75%'"
      @confirm="handleSetStaticData"
      @close="visibleStaticDataModel = false"
    >
      <code-editor
        language="json"
        :value="item.chartData.staticData"
        @change="handleStaticDataChange"
      />
    </modal-pro>
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
import CodeEditor from '@/components/CodeEditor'
import ModalPro from '@/components/ModelPro'
import { dataSourceTypeList } from './common'

export default {
  name: 'CommonDataOption',
  components: {
    CodeEditor,
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
      dataOptionForm: null,
      dataSourceTypeList,
      visibleStaticDataModel: false,
      visibleSQLModel: false,
      visibleRestModel: false
    }
  },
  methods: {
    handleConfigChange() {
      if (this.item.chartData.dataSourceType === 'Static') {
        this.$bus.$emit('handleStaticData')
      } else if (this.item.chartData.dataSourceType === 'DataBase') {
        this.$bus.$emit('handleDataBaseData')
      } else if (this.item.chartData.dataSourceType === 'Rest') {
        this.$bus.$emit('handleRestData')
      } else if (this.item.chartData.dataSourceType === 'File') {
        this.$bus.$emit('handleFileData')
      }
    },
    handleEditSQL() {
      this.visibleSQLModel = true
    },
    handleEditRest() {
      this.visibleRestModel = true
    },
    confirmSQL(sql) {
    },
    handleStaticDataChange(value) {
      this.item.chartData.staticData = value
    },
    handleSetStaticData() {
      this.$refs.staticData.setValue(this.item.chartData.staticData)
      this.visibleStaticDataModel = false
    }
  }
}
</script>
<style lang="less">
.chart-data-option {
  .fullscreen {
    z-index: 99;
    cursor: pointer;
    position: absolute;
    bottom: 25px;
    right: 45px;
    font-size: 20px;
  }
}
</style>
