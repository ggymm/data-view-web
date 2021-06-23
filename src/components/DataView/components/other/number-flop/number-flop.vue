<template>
  <div class="number-flop" :style="getItemStyle()">
    <span class="number-flop-title" :style="getTitleStyle()">标题</span>
    <span class="number-flop-number" :style="getNumberStyle()">数据</span>
  </div>
</template>

<script>
export default {
  name: 'NumberFlop',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      positive: {
        'left': 'flex-start',
        'center': 'center',
        'right': 'flex-end'
      }
    }
  },
  methods: {
    getItemStyle() {
      const align = this.item.option.align
      const position = this.item.option.title.position
      const style = {
        width: `${this.item.width}px`,
        height: `${this.item.height}px,`,
        padding: `${this.item.option.padding}px`,
        flexDirection: position
      }
      if (position.startsWith('column')) {
        style.justifyContent = 'center'
        style.alignItems = this.positive[align]
      } else {
        style.justifyContent = this.positive[align]
        style.alignItems = 'center'
        if (position.endsWith('reverse')) {
          style.justifyContent = this.positive[Math.abs(align - 2)]
        }
      }
      return style
    },
    getTitleStyle() {
      const position = this.item.option.title.position
      if (position.startsWith('column')) {
        return { [`margin${position.endsWith('reverse') ? 'Top' : 'Bottom'}`]: '10px' }
      } else {
        return { [`margin${position.endsWith('reverse') ? 'Left' : 'Right'}`]: '10px' }
      }
    },
    getNumberStyle() {
      switch (this.item.option.title.position) {
        case 'top':
          return { flex: '1 1 0%' }
        case 'bottom':
          return { flex: '1 1 0%' }
      }
    }
  }
}
</script>

<style lang="less">
.number-flop {
  display: flex;

  .number-flop-title {
    margin: 0;
    white-space: nowrap;
  }

  .number-flop-number {
    display: flex;
    align-items: baseline;
  }
}
</style>
