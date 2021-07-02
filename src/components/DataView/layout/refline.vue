<template>
  <div class="refline">
    <div v-for="(line, i) in lines()" :key="i">
      <div
        v-if="line.type === 'vertical'"
        :style="{
          position: 'absolute',
          left: `${line.left}px`,
          top: `${line.top}px`,
          width: '1px',
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
          height: '1px',
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
    'refline',
    'currentItem'
  ]),
  methods: {
    lines() {
      return (this.refline !== null && this.currentItem) ? this.refline.getAllRefLines() : []
    }
  }
}
</script>
