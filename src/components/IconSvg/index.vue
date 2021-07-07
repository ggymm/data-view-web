<template>
  <i class="icon-svg">
    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'Index',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#${this.type}`
    }
  }
}
</script>

<style lang="less">
.icon-svg {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  svg {

  }
}
</style>
