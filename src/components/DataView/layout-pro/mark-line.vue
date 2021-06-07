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
    this.$bus.$on('moving', (isRightward, isDownward) => {
      this.showLine(isRightward, isDownward)
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
    showLine(isRightward, isDownward) {
      if (this.charts.length === 1) return
      const lines = this.$refs
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
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top,
              lineShift: top
            },
            {
              isNearly: this.isNearly(thisStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top - thisStyle.height,
              lineShift: top
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(thisStyle.top + thisHeight, top + chartHeight),
              lineNode: lines.xc[0], // xc
              line: 'xc',
              dragShift: top + chartHeight - thisHeight,
              lineShift: top + chartHeight
            },
            {
              isNearly: this.isNearly(thisStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom,
              lineShift: bottom
            },
            {
              isNearly: this.isNearly(thisStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom - thisStyle.height,
              lineShift: bottom
            }
          ],
          left: [
            {
              isNearly: this.isNearly(thisStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left,
              lineShift: left
            },
            {
              isNearly: this.isNearly(thisStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left - thisStyle.width,
              lineShift: left
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(thisStyle.left + thisWidth, left + chartWidth),
              lineNode: lines.yc[0], // yc
              line: 'yc',
              dragShift: left + chartWidth - thisWidth,
              lineShift: left + chartWidth
            },
            {
              isNearly: this.isNearly(thisStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right,
              lineShift: right
            },
            {
              isNearly: this.isNearly(thisStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right - thisStyle.width,
              lineShift: right
            }
          ]
        }

        console.log(conditions)
        const needToShow = []
        Object.keys(conditions).forEach(key => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return
            condition.lineNode.style[key] = `${condition.lineShift}px`
            needToShow.push(condition.line)
          })
        })

        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
          this.chooseTheTureLine(needToShow, isDownward, isRightward)
        }
      }
    },
    chooseTheTureLine(needToShow, isDownward, isRightward) {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isRightward) {
        if (needToShow.includes('yr')) {
          this.lineStatus.yr = true
        } else if (needToShow.includes('yc')) {
          this.lineStatus.yc = true
        } else if (needToShow.includes('yl')) {
          this.lineStatus.yl = true
        }
      } else {
        if (needToShow.includes('yl')) {
          this.lineStatus.yl = true
        } else if (needToShow.includes('yc')) {
          this.lineStatus.yc = true
        } else if (needToShow.includes('yr')) {
          this.lineStatus.yr = true
        }
      }

      if (isDownward) {
        if (needToShow.includes('xb')) {
          this.lineStatus.xb = true
        } else if (needToShow.includes('xc')) {
          this.lineStatus.xc = true
        } else if (needToShow.includes('xt')) {
          this.lineStatus.xt = true
        }
      } else {
        if (needToShow.includes('xt')) {
          this.lineStatus.xt = true
        } else if (needToShow.includes('xc')) {
          this.lineStatus.xc = true
        } else if (needToShow.includes('xb')) {
          this.lineStatus.xb = true
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
