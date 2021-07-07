<template>
  <div class="data-view-chart-option">
    暂无
  </div>
</template>

<script>
export default {
  name: 'GaugeOption',
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
      labelPositionList: [
        { label: '扇区外侧', value: 'outside' },
        { label: '扇区内侧', value: 'inside' },
        { label: '扇区中心', value: 'center' }
      ],
      orientList: [
        { label: '纵向', value: 'vertical' },
        { label: '横向', value: 'horizontal' }
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
