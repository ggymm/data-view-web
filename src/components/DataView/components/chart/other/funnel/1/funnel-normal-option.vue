<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <chart-option :item="item" />
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import { labelPositionList } from '@/components/DataView/common/common'

export default {
  name: 'FunnelNormalOption',
  components: {
    ChartOption
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
