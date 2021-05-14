<template>
  <div :style="{backgroundColor: option.backgroundColor}" class="chart">
    <div
      :style="{
        color: option.fontColor,
        fontSize: option.fontSize + 'px',
        fontWeight: option.fontWeight,
        textAlign: option.textAlign
      }"
    >
      {{ option.title }}
    </div>
  </div>
</template>

<script>
import { getTitleTextConfig } from '../../config/other/title-text-config'

export default {
  name: 'TitleText',
  props: {
    option: {
      type: Object,
      default() {
        return getTitleTextConfig().option
      }
    }
  },
  data() {
    return {
      chartType: 'titleText'
    }
  }
}
</script>

<style scoped>

</style>
