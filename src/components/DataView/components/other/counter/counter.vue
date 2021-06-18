<template>
  <div :loading="loading" :style="{backgroundColor: option.backgroundColor}" class="chart">
    <div
      :style="{
        color: option.fontColor,
        fontSize: option.fontSize + 'px',
        fontWeight: option.fontWeight,
        textAlign: option.textAlign
      }"
    >
      <span
        v-if="option.prefix !== undefined"
        :style="{
          color: option.prefix.fontColor,
          fontSize: option.prefix.fontSize + 'px',
          fontWeight: option.prefix.fontWeight
        }"
      >
        {{ option.prefix.title }}
      </span>
      <span v-if="option.thousandth">{{ num | numFormat }}</span>
      <span v-if="!option.thousandth">{{ num }}</span>
      <span
        :style="{
          color: option.unit.fontColor,
          fontSize: option.unit.fontSize + 'px',
          fontWeight: option.unit.fontWeight
        }"
      >
        {{ option.unit.title }}
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
    apiData: {
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
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.num = this.apiData.value
      }
    }
  }
}
</script>

<style scoped>

</style>
