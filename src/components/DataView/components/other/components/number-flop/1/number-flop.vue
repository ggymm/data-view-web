<template>
  <div class="number-flop" :style="itemStyle()">
    <span v-if="item.option.title.show" class="number-flop-title" :style="titleStyle()">
      {{ item.option.title.text }}
    </span>
    <span class="number-flop-number" :style="numberStyle()">
      <span v-if="item.option.prefix.show" :style="prefixStyle()">
        {{ item.option.prefix.text }}
      </span>
      <span class="number-flop-numbers" :style="numbersStyle()">
        <span v-for="(n, index) in getNumbers()" :key="index" :style="numberItemStyle(n)">
          <span>{{ n }}</span>
        </span>
      </span>
      <span v-if="item.option.suffix.show" :style="suffixStyle()">
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
    itemStyle() {
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
    titleStyle() {
      const { title } = this.item.option
      const style = {
        color: title.color,
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
    numberStyle() {
      if (this.item.option.title.position.startsWith('column')) {
        return { flex: '1 1 0%' }
      }
    },
    numbersStyle() {
      const { number } = this.item.option
      return {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: number.color,
        fontSize: `${number.fontSize}px`,
        fontFamily: number.fontFamily
      }
    },
    numberItemStyle(n) {
      const { number } = this.item.option
      const style = {}
      if (number.backgroundImage) {
        style.background = `url(${number.backgroundImage}) no-repeat center center`
      }
      if (n === number.decimalSep || n === number.thousandthSep) {
        style.margin = '0'
      } else {
        style.margin = `0 ${number.space}px`
      }
      return style
    },
    prefixStyle() {
      const { prefix } = this.item.option

      return {
        color: prefix.color,
        marginRight: `${prefix.right}px`,
        fontSize: `${prefix.fontSize}px`,
        fontFamily: prefix.fontFamily
      }
    },
    suffixStyle() {
      const { suffix } = this.item.option

      return {
        color: suffix.color,
        marginLeft: `${suffix.left}px`,
        fontSize: `${suffix.fontSize}px`,
        fontFamily: suffix.fontFamily
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

    .number-flop-numbers {
      flex: 1 1 0;
    }
  }
}
</style>
