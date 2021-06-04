<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="line"
      class="line"
      :class="line.includes('x')? 'x-line' : 'y-line'"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MarkLine',
  data() {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'],
      diff: 3,
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false
      }
    }
  },
  computed: mapState([
    'currentItem'
  ]),
  mounted() {
    // 元素正在移动，显示对齐线
    this.$bus.$on('moving', (isDownward, isRightward) => {
      this.showLine(isDownward, isRightward)
    })

    // 元素移动完毕，隐藏对齐线
    this.$bus.$on('moved', () => {
      this.hideLine()
    })
  },
  methods: {
    showLine() {
      console.log('计算对齐线')
    },
    hideLine() {
      console.log('隐藏对齐线')
    }
  }
}
</script>

<style lang="less" scoped>
.mark-line {
  height: 100%;
}

.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}

.x-line {
  width: 100%;
  height: 1px;
}

.y-line {
  width: 1px;
  height: 100%;
}
</style>
