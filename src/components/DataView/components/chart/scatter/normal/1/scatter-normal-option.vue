<template>
  <div>
    <chart-option :item="item" />
    <coordinate-system-option :item="item" />
  </div>
</template>

<script>
import ChartOption from '@/components/DataView/common/option/chart'
import CoordinateSystemOption from '@/components/DataView/common/option/coordinate-system'

export default {
  name: 'ScatterNormalOption',
  components: {
    ChartOption,
    CoordinateSystemOption
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
    }
  }
}
</script>
