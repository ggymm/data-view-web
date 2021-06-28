<template>
  <div class="chart">
    <div
      v-if="item.option.header.show"
      :style="{
        color: item.option.header.fontColor,
        height: item.option.header.height + 'px',
        lineHeight: item.option.header.height + 'px',
        fontSize: item.option.header.fontSize + 'px',
      }"
      class="carousel-header"
    >
      <span
        v-for="(h, index) in item.option.header.data"
        :key="index"
        :style="{
          width: h['width'],
          float: 'left',
          textAlign: 'center'
        }"
      >{{ h['label'] }}</span>
    </div>
    <div :style="{ height: item.option.body.rowNum * item.option.body.height + 'px' }" class="carousel-container">
      <ul class="carousel-list">
        <li
          v-for="(b, index) in item.option.body.data"
          :key="index"
          :style="{
            color: item.option.body.fontColor,
            height: item.option.body.height + 'px',
            lineHeight: item.option.body.height + 'px',
            fontSize: item.option.body.fontSize + 'px'
          }"
        >
          <span
            v-for="(dataItem, childIndex) in b"
            :key="childIndex"
            :style="{width: item.option.header.data[childIndex]['width']}"
          >{{ dataItem }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselList',
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
      container: null,
      timer: null,
      speed: this.item.option.speed
    }
  },
  computed: {
    data() {
      return this.item.data
    }
  },
  watch: {
    data: {
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
        this.speed = this.item.option.speed
        this.updateTimer()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  async mounted() {
    this.setData()
    this.container = document.getElementById(this.item.elId).querySelector('.carousel-list')
    const _this = this
    const animationEndHandler = () => {
      _this.container.style.cssText = 'transform:translate(0,0)'
      _this.container.appendChild(this.container.children[0])
    }
    this.container.removeEventListener('transitionend', animationEndHandler)
    this.container.addEventListener('transitionend', animationEndHandler)
  },
  methods: {
    setTimer: function() {
      const _this = this
      this.timer = setInterval(() => {
        if (_this.container.children[0]) {
          _this.container.style.cssText = `transform:translate(0px,-${_this.item.option.body.height}px);transition:all .5s ease;`
        }
      }, this.item.option.body.speed * 1000)
    },
    updateTimer() {
      clearInterval(this.timer)
      this.setTimer()
    },
    setData() {
      this.item.option.body.data = JSON.parse(JSON.stringify(this.data.body))
      if (this.item.option.header.data.length === this.data.header.length) {
        return
      }
      const header = []
      for (let i = 0; i < this.data.header.length; i++) {
        header.push({
          width: '100px',
          label: this.data.header[i]
        })
      }
      this.$set(this.item.option.header, 'data', header)
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
