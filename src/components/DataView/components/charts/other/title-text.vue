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
import OptionConfigMap from '@/components/DataView/components/config'

export default {
  name: 'TitleText',
  props: {
    option: {
      type: Object,
      default() {
        return OptionConfigMap['TitleText'].option
      }
    }
  }
}
</script>

