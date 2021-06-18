<template>
  <component
    :is="item.chartType + 'Option'"
    :item="item"
    :data-source-list="dataSourceList"
    @handleDeleteItem="handleDeleteItem"
    @handleEditOption="handleEditOption"
    @handleEditSql="handleEditSql"
  />
</template>

<script>
import '../components/index'

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
