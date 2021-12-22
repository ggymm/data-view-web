<template>
  <div class="refline">
    <div v-for="(line, i) in lines()" :key="i">
      <div
        v-if="line.type === 'vertical'"
        :style="{
          position: 'absolute',
          left: `${line.left}px`,
          top: `${line.top}px`,
          width: '0',
          height: `${line.size}px`,
          borderLeft: '1px dashed var(--color-primary)'
        }"
      />
      <div
        v-else-if="line.type === 'horizontal'"
        :style="{
          position: 'absolute',
          left: `${line.left}px`,
          top: `${line.top}px`,
          height: '0',
          width: `${line.size}px`,
          borderTop: '1px dashed var(--color-primary)'
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Refline',
  computed: mapState([
    'refline'
  ]),
  methods: {
    lines() {
      return []
    }
  }
}
</script>
<style lang="less">
.refline {
  border-color: var(--color-primary);
}
</style>
