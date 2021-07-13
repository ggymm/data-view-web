<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div :class="[showData() ? 'three' : 'two']">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        <div class="info">
          <span class="title">
            <span>{{ currentItem.chartName }}
              <span class="version">[v{{ currentItem.chartVersion }}]</span>
            </span>
            <span class="update">更新版本</span>
          </span>
          <span class="doc">
            <a-space :size="20">
              <a-button icon="question-circle" size="small" type="primary" :ghost="true">组件手册</a-button>
              <a-button icon="search" size="small" type="primary" :ghost="true">搜索配置</a-button>
            </a-space>
          </span>
        </div>
        <a-collapse :bordered="false" default-active-key="基础配置">
          <a-collapse-panel key="基础配置" header="基础配置">
            <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
              <a-form-item label="位置">
                <a-row :gutter="20">
                  <a-col :span="12">
                    <a-input-number v-model="currentItem.x" :min="0" :precision="0" />
                  </a-col>
                  <a-col :span="12">
                    <a-input-number v-model="currentItem.y" :min="0" :precision="0" />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item label="大小">
                <a-row :gutter="20">
                  <a-col :span="12">
                    <a-input-number v-model="currentItem.width" :min="0" :precision="0" />
                  </a-col>
                  <a-col :span="12">
                    <a-input-number v-model="currentItem.height" :min="0" :precision="0" />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item label="旋转角度">
                <a-input-number v-model="currentItem.rotate" :min="0" :max="360" :precision="0" />
              </a-form-item>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
        <component
          :is="currentItem.chartType + 'Option_' + currentItem.chartVersion"
          :item="currentItem"
        />
      </a-tab-pane>
      <a-tab-pane key="attribute" tab="属性" :force-render="true">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="是否锁定">
            <a-select v-model="currentItem.lock">
              <a-select-option value="false">不锁定</a-select-option>
              <a-select-option value="true">锁定</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane v-if="showData()" key="data" tab="数据" :force-render="true">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}" class="chart-data-option">
          <a-form-item label="数据源类型">
            <a-select v-model="currentItem.chartData.dataSourceType" @change="handleConfigChange">
              <a-select-option
                v-for="dataSourceType in dataSourceTypeList"
                :key="dataSourceType.value"
                :value="dataSourceType.value"
              >
                {{ dataSourceType.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <template v-if="currentItem.chartData.dataSourceType === 'Static'">
            <code-editor
              id="staticData"
              ref="staticData"
              language="json"
              :value="currentItem.chartData.staticData"
              @change="handleStaticDataChange"
              @blur="handleConfigChange"
            >
              <icon class="fullscreen" type="icon-fullscreen-expand" @click="visibleStaticDataModel = true" />
            </code-editor>
          </template>
          <template v-else-if="currentItem.chartData.dataSourceType === 'DataBase'">
            <a-form-item label="数据源">
              <a-select v-model="currentItem.chartData.database" @change="handleConfigChange">
                <a-select-option
                  v-for="dataSource in dataSourceList"
                  :key="dataSource.data_source_id"
                  :value="dataSource.data_source_id"
                >
                  {{ dataSource.data_source_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-for="(param, index) in params()" :key="index" :label="param.label">
              <a-input v-model="currentItem.chartData[param.value]" @change="handleConfigChange" />
            </a-form-item>
            <a-form-item label="SQL">
              <a-textarea v-model="currentItem.chartData.sql" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" size="small">调试SQL</a-button>
            </a-form-item>
          </template>
          <template v-else-if="currentItem.chartData.dataSourceType === 'Rest'">
            <a-form-item label="接口地址">
              <a-input v-model="currentItem.chartData.restUrl" @change="handleConfigChange" />
            </a-form-item>
            <a-button type="primary" size="small" @click="handleEditRest">调试API</a-button>
          </template>
          <template v-else-if="currentItem.chartData.dataSourceType === 'Csv'" />
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <div style="display: none">
      <div id="rest-data">
        <div class="modal-form-item dark-theme">
          <div class="label">请求接口地址</div>
          <div class="control-wrapper">
            <a-row :gutter="30">
              <a-col :span="12">
                <a-input>
                  <a-select slot="addonBefore" default-value="Http://" style="width: 80px">
                    <a-select-option value="Http://">Http://</a-select-option>
                    <a-select-option value="Https://">Https://</a-select-option>
                  </a-select>
                </a-input>
              </a-col>
              <a-col :span="12">
                <a-button type="primary">发送请求</a-button>
              </a-col>
            </a-row>
          </div>
        </div>
        <a-tabs default-active-key="1">
          <a-tab-pane key="Cookie" tab="Cookie">
            Cookie
          </a-tab-pane>
          <a-tab-pane key="请求头参数" tab="请求头参数" :force-render="true">
            请求头参数
          </a-tab-pane>
          <a-tab-pane key="请求体参数" tab="请求体参数(JSON)" :force-render="true">
            <div class="control-wrapper">
              <code-editor
                id="rest-data-body"
                language="json"
                height="250px"
                :value="currentItem.chartData.restBody"
              />
            </div>
          </a-tab-pane>
        </a-tabs>
        <a-row :gutter="30">
          <a-col :span="24">
            <div class="modal-form-item">
              <div class="label">请求结果(JSON)</div>
              <div class="control-wrapper">
                <code-editor
                  id="rest-data-result"
                  language="json"
                  height="250px"
                  :value="currentItem.chartData.rest"
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import WinBox from 'winbox/src/js/winbox'
import defaultSettings from '@/config'
import { mapState } from 'vuex'
import '../components/index'
import { EventBus } from '@/utils/event-bus'
import CodeEditor from '@/components/CodeEditor'
import { dataSourceTypeList, positionList, positionTopList, legendTypeList, orientList } from '../common/common.js'

const coordinateSystemParams = [
  {
    'label': '分类字段',
    'value': 'dimension'
  },
  {
    'label': 'x轴字段',
    'value': 'name'
  },
  {
    'label': 'y轴字段',
    'value': 'value'
  }
]

const keyValueParams = [
  {
    'label': '数据字段',
    'value': 'name'
  },
  {
    'label': '值字段',
    'value': 'value'
  }
]

const valueParams = [
  {
    'label': '数据字段',
    'value': 'value'
  }
]

const paramsMap = {
  'ScatterNormal_1': coordinateSystemParams,
  'LineNormal_1': coordinateSystemParams,
  'LineArea_1': coordinateSystemParams,
  'HistogramNormal_1': coordinateSystemParams,
  'PictorialBar_1': coordinateSystemParams,
  'MapChina_1': keyValueParams,
  'PieNormal_1': keyValueParams,
  'RadarNormal_1': [
    {
      'label': '分类字段',
      'value': 'dimension'
    },
    {
      'label': '最大值',
      'value': 'max'
    },
    {
      'label': '数据字段',
      'value': 'name'
    },
    {
      'label': '值字段',
      'value': 'value'
    }
  ],
  'wordCloud_1': [],
  'gauge_1': [],
  'FunnelNormal_1': [],
  'EarlyWarning_1': valueParams,
  'TitleText_1': null,
  'ImageChart_1': null,
  'CarouselList_1': [],
  'CarouselList_2': [],
  'Counter_1': valueParams,
  'NumberFlop_1': valueParams,
  'Progress_1': valueParams
}

export default {
  name: 'ChartOption',
  components: {
    CodeEditor
  },
  props: {
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      serviceBaseUrl: defaultSettings.serviceBaseUrl,
      restResult: null,
      paramsMap,
      dataSourceTypeList,
      positionList,
      positionTopList,
      legendTypeList,
      orientList
    }
  },
  computed: mapState([
    'currentItem'
  ]),
  watch: {
    currentItem: function() {
      if (this.currentItem.chartData.dataSourceType === 'Static') {
        this.$nextTick(() => {
          this.$refs.staticData.setValue(this.currentItem.chartData.staticData)
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    showData() {
      return this.params() !== null
    },
    params() {
      return paramsMap[`${this.currentItem.chartType}_${this.currentItem.chartVersion}`]
    },
    handleConfigChange() {
      if (this.currentItem.chartData.dataSourceType === 'Static') {
        EventBus.$emit('handleStaticData')
      } else if (this.currentItem.chartData.dataSourceType === 'DataBase') {
        EventBus.$emit('handleDataBaseData')
      } else if (this.currentItem.chartData.dataSourceType === 'Rest') {
        this.currentItem.chartData.restUrl = `${this.serviceBaseUrl}data-view/chart-data`
        EventBus.$emit('handleRestData')
      } else if (this.currentItem.chartData.dataSourceType === 'File') {
        EventBus.$emit('handleFileData')
      }
    },
    handleStaticDataChange(value) {
      this.currentItem.chartData.staticData = value
    },
    handleEditRest() {
      new WinBox('调试RestAPI', {
        x: 'center',
        y: 'center',
        width: '75%',
        height: '75%',
        class: 'modern',
        mount: document.getElementById('rest-data')
      })
    }
  }
}
</script>
<style lang="less">
@import '~winbox/src/css/themes/modern.less';
@import '~winbox/src/css/winbox.less';

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

.winbox.modern {
  z-index: 99 !important;
  animation: none !important;
  background: var(--color-primary);

  .wb-body {
    padding: 20px;
    background-color: var(--modal-bg);
  }
}

.modal-form-item {
  display: flex;
  flex-direction: column;

  .label {
    margin: 15px 0 10px;
  }

  .control-wrapper {
  }
}
</style>
