<template>
  <div class="number-flop" :style="getItemStyle()">
    <span v-if="item.option.title.show" class="number-flop-title" :style="getTitleStyle()">
      {{ item.option.title.text }}
    </span>
    <span class="number-flop-number" :style="getNumberStyle()">
      <span v-if="item.option.prefix.show" :style="getPrefixStyle()">
        {{ item.option.prefix.text }}
      </span>
      <span class="number-flop-numbers">
        <span v-for="(n, index) in getNumbers()" :key="index" :style="getNumberItemStyle()">
          <span>{{ n }}</span>
        </span>
      </span>
      <span v-if="item.option.suffix.show" :style="getSuffixStyle()">
        {{ item.option.suffix.text }}
      </span>
    </span>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/number'

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
      positive: ['flex-start', 'center', 'flex-end'],
      numbers: []
    }
  },
  computed: {
    data() {
      return this.item.data
    }
  },
  methods: {
    getNumbers() {
      const { number } = this.item.option
      let value = formatNumber(this.data.value,
        number.decimal, number.decimalSep,
        number.thousandth ? number.thousandthSep : null)
      if (value.length < number.digit) {
        value = (Array(number.digit).join('0') + value).slice(-number.digit)
      }
      return value
    },
    getItemStyle() {
      const align = this.item.option.align
      const position = this.item.option.title.position
      const style = {
        width: `${this.item.width}px`,
        height: `${this.item.height}px`,
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
      const { title } = this.item.option
      const style = {
        color: title.fontColor,
        fontSize: `${title.fontSize}px`,
        fontWeight: title.fontWeight
      }
      if (title.position.startsWith('column')) {
        style[`margin${title.position.endsWith('reverse') ? 'Top' : 'Bottom'}`] = `${title.margin}px`
      } else {
        style[`margin${title.position.endsWith('reverse') ? 'Left' : 'Right'}`] = `${title.margin}px`
      }
      return style
    },
    getNumberStyle() {
      if (this.item.option.title.position.startsWith('column')) {
        return { flex: '1 1 0%' }
      }
    },
    getNumberItemStyle() {
      return {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'arial',
        fontSize: '20px',
        margin: '0 1px 0 1px',
        color: '#ffffff'
      }
    },
    getPrefixStyle() {
    },
    getSuffixStyle() {
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

    .number-flop-numbers {
      display: flex;
      flex: 1 1 0;
      height: 100%;
      align-items: baseline;
    }
  }
}
</style>
