<template>
  <div>
    <component
      :is="item.chartType + 'Option'"
      :item="item"
      :data-source-list="dataSourceList"
      @handleDeleteItem="handleDeleteItem"
      @handleEditOption="handleEditOption"
      @handleEditSql="handleEditSql"
    />
  </div>
</template>

<script>
import '../options'

export default {
  name: 'ChartOption',
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
    }
  },
  mounted() {
  },
  methods: {
    handleDeleteItem(item) {
      this.$emit('handleDeleteItem', item)
    },
    handleEditOption(option) {
    },
    handleEditSql(sql) {
    }
  }
}
</script>

<style lang="less">
.data-view-chart-option {
  &.one {
    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab-active {
        color: rgba(0, 0, 0, 0.65);
      }

      .ant-tabs-tab {
        width: 100%;
        margin: 0;
        text-align: center;
      }
    }
  }

  &.two {
    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab {
        width: 50%;
        margin: 0;
        text-align: center;
      }
    }
  }

  &.three {
    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab {
        width: 33.33%;
        margin: 0;
        text-align: center;
      }
    }
  }

  .ant-tabs-bar {
    position: fixed;
    top: 50px;
    width: 450px;
    margin: 0;
    z-index: 99;
    background: #ffffff;
  }

  .ant-tabs-content {
    margin-top: 44px;
  }

  .ant-form {
    padding: 20px;
  }

  .ant-collapse-content-box {
    padding: 0;
  }

  .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content {
    background-color: #ffffff;
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border: none;
  }

  .ant-collapse > .ant-collapse-item {
    border: none;
  }

  .ant-collapse-header {
    background-color: #f2f2f2;
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>
