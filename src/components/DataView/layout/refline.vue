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
          borderLeft: '1px dashed var(--primary-color)'
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
          borderTop: '1px dashed var(--primary-color)'
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
      if (this.refline !== null) {
        // console.log(JSON.stringify(this.refline.getAllRefLines(), null, 2))
      }
      return this.refline !== null ? this.refline.getAllRefLines() : []
    }
  }
}
</script>
<style lang="less">
.refline {
  border-color: var(--primary-color);
}
</style>
