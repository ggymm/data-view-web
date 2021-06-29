<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <common-chart-option :item="item" />
  </div>
</template>

<script>
import CommonChartOption from '@/components/DataView/common-option/chart'
import { labelPositionList } from '@/components/DataView/common-option/common'

export default {
  name: 'FunnelNormalOption',
  components: {
    CommonChartOption
  },
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
      labelPositionList
    }
  },
  methods: {
  }
}
</script>
