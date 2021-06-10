<template>
  <component
    :is="currentItem.chartType + 'Option'"
    :item="currentItem"
    :data-source-list="dataSourceList"
    @handleDeleteItem="handleDeleteItem"
    @handleEditOption="handleEditOption"
    @handleEditSql="handleEditSql"
  />
</template>

<script>
import { mapState } from 'vuex'
import '../components/options'

export default {
  name: 'ChartOption',
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
    }
  },
  computed: mapState([
    'currentItem'
  ]),
  mounted() {
  },
  methods: {
    handleDeleteItem(item) {
    },
    handleEditOption(option) {
    },
    handleEditSql(sql) {
    }
  }
}
</script>
