<template>
  <div
    id="data-view-container-layout"
    ref="item"
    :style="{background: backgroundColor,
             backgroundImage: backgroundImg,
             backgroundRepeat: 'no-repeat',
             backgroundSize: '100% 100%'}"
    class="data-view-container-layout"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutPreview',
  provide() {
    return {
      eventBus: null
    }
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      default: '#263546'
    },
    backgroundImg: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
    }
  },
  watch: {},
  created() {
  },
  beforeDestroy: function() {
  },
  methods: {
  }
}
</script>
