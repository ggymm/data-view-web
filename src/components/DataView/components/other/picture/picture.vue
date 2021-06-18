<template>
  <div class="chart">
    <div style="width: 100%;height: 100%;">
      <canvas :id="'picture_' + elId" style="width: 100%;height: 100%;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureV',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    elId: {
      type: String,
      required: true
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
  }
}
</script>
