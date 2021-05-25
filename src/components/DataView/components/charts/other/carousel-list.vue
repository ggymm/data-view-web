<template>
  <div :loading="loading" class="chart">
    <div
      v-if="option.header.show"
      :style="{
        color: option.header.fontColor,
        height: option.header.height + 'px',
        lineHeight: option.header.height + 'px',
        fontSize: option.header.fontSize + 'px',
      }"
      class="carousel-header"
    >
      <span
        v-for="(data, index) in option.header.data"
        :key="index"
        :style="{
          width: data['width'],
          float: 'left',
          textAlign: 'center'
        }"
      >{{ data['label'] }}</span>
    </div>
    <div :style="{ height: option.body.rowNum * option.body.height + 'px' }" class="carousel-container">
      <ul class="carousel-list">
        <li
          v-for="(data, index) in option.body.data"
          :key="index"
          :style="{
            color: option.body.fontColor,
            height: option.body.height + 'px',
            lineHeight: option.body.height + 'px',
            fontSize: option.body.fontSize + 'px'
          }"
        >
          <span
            v-for="(dataItem, childIndex) in data"
            :key="childIndex"
            :style="{width: option.header.data[childIndex]['width']}"
          >{{ dataItem }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OptionConfigMap from '@/components/DataView/components/config'

export default {
  name: 'CarouselList',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return OptionConfigMap['CarouselList'].option
      }
    },
    i: {
      type: String,
      required: true
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
      container: null,
      timer: null,
      speed: this.option.speed
    }
  },
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.setData()
        this.$nextTick(function() {
          if (this.timer === null) {
            this.setTimer()
          }
        })
      }
    },
    option: {
      deep: true,
      handler() {
        this.speed = this.option.speed
        this.updateTimer()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  async mounted() {
    this.container = document.getElementById(this.i).querySelector('.carousel-list')
    const _this = this
    const animationEndHandler = () => {
      _this.container.style.cssText = 'transform:translate(0,0)'
      _this.container.appendChild(this.container.children[0])
    }
    _this.container.removeEventListener('transitionend', animationEndHandler)
    _this.container.addEventListener('transitionend', animationEndHandler)
  },
  methods: {
    setTimer: function() {
      const _this = this
      this.timer = setInterval(() => {
        if (_this.container.children[0]) {
          _this.container.style.cssText = `transform:translate(0px,-${_this.option.body.height}px);transition:all .5s ease;`
        }
      }, this.option.body.speed * 1000)
    },
    updateTimer() {
      clearInterval(this.timer)
      this.setTimer()
    },
    setData() {
      for (let i = 0; i < this.apiData.header.length; i++) {
        this.option.header.data.push({
          width: '100px',
          label: this.apiData.header[i]
        })
      }

      this.option.body.data = JSON.parse(JSON.stringify(this.apiData.body))
    }
  }
}
</script>

<style lang="less">
.carousel-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  .carousel-list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin: 0;
      padding: 0;
      span {
        display: inline-block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
