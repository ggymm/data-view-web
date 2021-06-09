<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="line"
      class="line"
      :class="[line.includes('x')? 'x-line' : 'y-line', line]"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getItemRotatedStyle } from './calculate'

export default {
  name: 'MarkLine',
  data() {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'],
      diff: 6,
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
    'charts',
    'canvasStyle',
    'currentItem'
  ]),
  mounted() {
    // 元素正在移动，显示对齐线
    this.$bus.$on('moving', () => {
      this.showLine()
    })

    // 元素移动完毕，隐藏对齐线
    this.$bus.$on('moved', () => {
      this.hideLine()
    })
  },
  methods: {
    hideLine() {
      Object.keys(this.lineStatus).forEach(line => {
        this.lineStatus[line] = false
      })
    },
    showLine() {
      if (this.charts.length === 1) return
      const lines = {
        xt: document.querySelector('.xt'),
        xc: document.querySelector('.xc'),
        xb: document.querySelector('.xb'),
        yl: document.querySelector('.yl'),
        yc: document.querySelector('.yc'),
        yr: document.querySelector('.yr')
      }
      const charts = this.charts
      const thisStyle = {
        top: this.currentItem.y,
        left: this.currentItem.x,
        width: this.currentItem.width,
        height: this.currentItem.height,
        rotate: this.currentItem.rotate
      }
      getItemRotatedStyle(thisStyle)
      const thisWidth = thisStyle.width / 2
      const thisHeight = thisStyle.height / 2

      this.hideLine()
      for (let i = 0; i < charts.length; i++) {
        const item = charts[i]
        if (item === this.currentItem) continue

        const itemStyle = {
          top: item.y,
          left: item.x,
          width: item.width,
          height: item.height,
          rotate: item.rotate
        }
        getItemRotatedStyle(itemStyle)

        const { top, left, bottom, right } = itemStyle
        const itemWidth = itemStyle.width / 2
        const itemHeight = itemStyle.height / 2

        const conditions = {
          top: [
            {
              isNearly: this.isNearly(thisStyle.top, top),
              lineNode: lines.xt, line: 'xt',
              dragShift: top, lineShift: top
            },
            {
              isNearly: this.isNearly(thisStyle.bottom, top),
              lineNode: lines.xt, line: 'xt',
              dragShift: top - thisStyle.height, lineShift: top
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(thisStyle.top + thisHeight, top + itemHeight),
              lineNode: lines.xc, line: 'xc',
              dragShift: top + itemHeight - thisHeight, lineShift: top + itemHeight
            },
            {
              isNearly: this.isNearly(thisStyle.top, bottom),
              lineNode: lines.xb, line: 'xb',
              dragShift: bottom, lineShift: bottom
            },
            {
              isNearly: this.isNearly(thisStyle.bottom, bottom),
              lineNode: lines.xb, line: 'xb',
              dragShift: bottom - thisStyle.height, lineShift: bottom
            }
          ],
          left: [
            {
              isNearly: this.isNearly(thisStyle.left, left),
              lineNode: lines.yl, line: 'yl',
              dragShift: left, lineShift: left
            },
            {
              isNearly: this.isNearly(thisStyle.right, left),
              lineNode: lines.yl, line: 'yl',
              dragShift: left - thisStyle.width, lineShift: left
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(thisStyle.left + thisWidth, left + itemWidth),
              lineNode: lines.yc, line: 'yc',
              dragShift: left + itemWidth - thisWidth, lineShift: left + itemWidth
            },
            {
              isNearly: this.isNearly(thisStyle.left, right),
              lineNode: lines.yr, line: 'yr',
              dragShift: right, lineShift: right
            },
            {
              isNearly: this.isNearly(thisStyle.right, right),
              lineNode: lines.yr, line: 'yr',
              dragShift: right - thisStyle.width, lineShift: right
            }
          ]
        }

        const showLines = []
        Object.keys(conditions).forEach(key => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return
            if (!condition.lineNode) return
            // 修改当前组件位移
            this.itemAdsorption(key, condition, thisStyle, itemStyle)
            // 显示对齐线
            condition.lineNode.style[key] = `${condition.lineShift}px`
            showLines.push(condition.line)
          })
        })

        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (showLines.length > 0) {
          this.lineStatus.yl = showLines.includes('yl')
          this.lineStatus.yc = showLines.includes('yc')
          this.lineStatus.yr = showLines.includes('yr')
          this.lineStatus.xt = showLines.includes('xt')
          this.lineStatus.xc = showLines.includes('xc')
          this.lineStatus.xb = showLines.includes('xb')
        }
      }
    },
    isNearly(dragValue, targetValue) {
      return Math.abs(dragValue - targetValue) <= this.diff
    },
    /**
     * 组件吸附效果
     * @param key 吸附位置
     * @param condition 吸附效果
     * @param thisStyle 当前拖拽样式
     * @param itemStyle 需要吸附的元素样式
     */
    itemAdsorption(key, condition, thisStyle, itemStyle) {
      const fixStyle = {}
      if (thisStyle.rotate === 0) {
        if (key === 'top') {
          fixStyle.y = condition.dragShift
        }
        if (key === 'left') {
          fixStyle.x = condition.dragShift
        }
        this.$store.commit('setItemStyle', fixStyle)
        return
      }

      const { width, height } = thisStyle
      if (key === 'top') {
        fixStyle.y = Math.round(condition.dragShift - (height - itemStyle.height) / 2)
      }
      if (key === 'left') {
        fixStyle.x = Math.round(condition.dragShift - (width - itemStyle.width) / 2)
      }
      this.$store.commit('setItemStyle', fixStyle)
    }
  }
}
</script>

<style lang="less" scoped>
.mark-line {
  height: 100%;
}

.line {
  position: absolute;
  z-index: 1000;
}

.x-line {
  width: 100%;
  border-top: 1px dashed #59c7f9;
}

.y-line {
  border-left: 1px dashed #59c7f9;
  height: 100%;
}
</style>
