<template>
  <div :style="{backgroundColor: item.option.backgroundColor}" class="chart">
    <div
      :style="{
        color: item.option.fontColor,
        fontSize: item.option.fontSize + 'px',
        fontWeight: item.option.fontWeight,
        textAlign: item.option.textAlign
      }"
    >
      <span
        v-if="item.option.prefix !== undefined"
        :style="{
          color: item.option.prefix.fontColor,
          fontSize: item.option.prefix.fontSize + 'px',
          fontWeight: item.option.prefix.fontWeight
        }"
      >
        {{ item.option.prefix.title }}
      </span>
      <span v-if="item.option.thousandth">{{ num | numFormat }}</span>
      <span v-if="!item.option.thousandth">{{ num }}</span>
      <span
        :style="{
          color: item.option.unit.fontColor,
          fontSize: item.option.unit.fontSize + 'px',
          fontWeight: item.option.unit.fontWeight
        }"
      >
        {{ item.option.unit.title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  filters: {
    numFormat: function(value) {
      if (!value) return ' '
      return Number(value).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
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
      num: 0
    }
  },
  computed: {
    data() {
      return this.item.data
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.num = this.data.value
      }
    }
  }
}
</script>
