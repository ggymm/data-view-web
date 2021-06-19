<template>
  <div class="chart">
    <div style="width: 100%;height: 100%;">
      <canvas :id="'picture_' + item.elId" style="width: 100%;height: 100%;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureV',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    },
    theme: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chartType: 'pictureV',
      num: 0
    }
  },
  computed: {
    apiData() {
      return this.item.data
    }
  }
}
</script>
