<template>
  <component
    :is="currentItem.chartType + 'Option'"
    :item="currentItem"
    :data-source-list="dataSourceList"
  />
</template>

<script>
import { mapState } from 'vuex'
import '../components/index'

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
  }
}
</script>
