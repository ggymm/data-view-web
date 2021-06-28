<template>
  <div class="chart">
    <div v-if="item.option.header.show" :style="headerStyle()" class="carousel-header">
      <span v-for="(h, index) in item.option.header.data" :key="index" :style="headerItemStyle(index)">{{ h }}</span>
    </div>
    <div :style="{ height: item.option.carousel.rowNum * item.option.body.height + 'px' }" class="carousel-container">
      <ul class="carousel-list">
        <li v-for="(b, index) in item.option.body.data" :key="index" :style="listStyle()">
          <span v-for="(dataItem, childIndex) in b" :key="childIndex" :style="listItemStyle(childIndex)">{{ dataItem }}</span>
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
      timer: null
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
    headerStyle() {
      return {
        color: this.item.option.header.fontColor,
        height: this.item.option.header.height + 'px',
        lineHeight: this.item.option.header.height + 'px',
        fontSize: this.item.option.header.fontSize + 'px'
      }
    },
    headerItemStyle(index) {
      return {
        flex: `${this.item.option.column[index]['width']} 1 0%`,
        textAlign: this.item.option.header.textAlign[index]
      }
    },
    listStyle() {
      return {
        color: this.item.option.body.fontColor,
        height: this.item.option.body.height + 'px',
        lineHeight: this.item.option.body.height + 'px',
        fontSize: this.item.option.body.fontSize + 'px'
      }
    },
    listItemStyle(index) {
      return {
        flex: `${this.item.option.column[index]['width']} 1 0%`,
        textAlign: this.item.option.body.textAlign[index]
      }
    },
    setTimer: function() {
      const _this = this
      this.timer = setInterval(() => {
        if (_this.container.children[0]) {
          _this.container.style.cssText = `transform:translate(0px,-${_this.item.option.body.height}px);transition:all .5s ease;`
        }
      }, this.item.option.carousel.speed * 1000)
    },
    updateTimer() {
      clearInterval(this.timer)
      this.setTimer()
    },
    setData() {
      this.item.option.body.data = JSON.parse(JSON.stringify(this.data.body))
      this.item.option.header.data = JSON.parse(JSON.stringify(this.data.header))
      if (this.item.option.column.length === this.data.header.length) {
        return
      }
      const column = []
      for (let i = 0; i < this.data.header.length; i++) {
        column.push({
          width: 1
        })
      }
      this.$set(this.item.option, 'column', column)
      console.log(this.item.option)
    }
  }
}
</script>

<style lang="less">
.carousel-header {
  display: flex;
  padding: 0;
}

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
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
