<template>
  <div class="data-view-chart-option">
    暂无
  </div>
</template>

<script>
export default {
  name: 'CounterOption',
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
      dataSourceTypeList: [
        { label: '数据库数据源', value: 'DataBase' },
        { label: 'CSV文件数据源', value: 'CSV' }
      ],
      fontWeightList: [
        { label: '普通', value: 'normal' },
        { label: '加粗', value: 'bold' }
      ],
      textAlignList: [
        { label: '居左', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'right' }
      ],
      isShowList: [
        { label: '显示', value: true },
        { label: '隐藏', value: false }
      ]
    }
  },
  methods: {
    handleDelete() {
      this.$confirm('是否删除该图表?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('handleDeleteItem', this.item)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
