<template>
  <div :style="{backgroundColor: option.backgroundColor}" class="chart">
    <div
      :style="{
        lineHeight: option.height + 'px',
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
export default {
  name: 'TitleText',
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

