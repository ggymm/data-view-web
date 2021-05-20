<template>
  <div class="data-view-chart-option one">
    <a-tabs>
      <a-tab-pane key="style" tab="样式">
        暂无
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { fontWeightList, positionList } from '../common'

export default {
  name: 'TitleTextOption',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      fontWeightList,
      positionList
    }
  },
  methods: {
    handleDelete() {
    }
  }
}
</script>
