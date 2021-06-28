<template>
  <div :style="{backgroundColor: item.option.backgroundColor}" class="chart">
    <div
      :style="{
        lineHeight: item.option.height + 'px',
        color: item.option.fontColor,
        fontSize: item.option.fontSize + 'px',
        fontWeight: item.option.fontWeight,
        textAlign: item.option.textAlign
      }"
    >
      {{ item.option.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleText',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

