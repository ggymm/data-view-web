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

      for (const key in lines) {
        if (lines[key] === undefined) {
          return
        }
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
        const chart = charts[i]
        if (chart === this.currentItem) continue

        const chartStyle = {
          top: chart.y,
          left: chart.x,
          width: chart.width,
          height: chart.height,
          rotate: chart.rotate
        }
        getItemRotatedStyle(chartStyle)

        const { top, left, bottom, right } = chartStyle
        const chartWidth = chartStyle.width / 2
        const chartHeight = chartStyle.height / 2

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
              isNearly: this.isNearly(thisStyle.top + thisHeight, top + chartHeight),
              lineNode: lines.xc, line: 'xc',
              dragShift: top + chartHeight - thisHeight, lineShift: top + chartHeight
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
              isNearly: this.isNearly(thisStyle.left + thisWidth, left + chartWidth),
              lineNode: lines.yc, line: 'yc',
              dragShift: left + chartWidth - thisWidth, lineShift: left + chartWidth
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
