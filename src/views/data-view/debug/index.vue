<template>
  <div class="debug-main">
    <div class="option">
      <json-editor :height="'100%'" :json="option" @editor="optionChange" />
    </div>
    <div class="chart">
      <div class="chart-panel">
        <div class="chart-container">
          <echarts
            ref="chart"
            :autoresize="true"
            :option="option"
            :update-options="updateOptions"
            element-loading-text="加载中"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'Index',
  components: {
    JsonEditor
  },
  data() {
    return {
      updateOptions: {
        notMerge: true,
        lazyUpdate: false
      },
      option: {}
    }
  },
  mounted() {
  },
  methods: {
    optionChange(option) {
      this.option = option
    }
  }
}
</script>

<style lang="less">
.debug-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;

  .option {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40%;

    .jsoneditor {
      border-right: 1px solid #ececec;
    }
  }

  .chart {
    position: absolute;
    right: 0;
    width: 60%;
    height: 100%;
    padding-left: 8px;
    z-index: 30;
    background: #f3f4fa;

    .chart-panel {
      position: absolute;
      top: 15px;
      right: 15px;
      bottom: 15px;
      left: 15px;
      box-sizing: border-box;
      border-radius: 5px;
      background: #ffffff;
      overflow: hidden;
      padding: 10px;

      .chart-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
