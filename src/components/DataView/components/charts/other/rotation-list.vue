<template>
  <div :loading="loading" class="chart">
    <div
      v-if="option.column.show"
      :style="{
        color: option.column.fontColor,
        height: option.column.height + 'px',
        lineHeight: option.column.height + 'px',
        fontSize: option.column.fontSize + 'px',
      }"
      class="rotation-column"
    >
      <span
        v-for="(column, index) in option.columnList"
        :key="index"
        :style="{width: option.columnWidthList[index]}"
      >{{ column }}</span>
    </div>
    <div
      :style="{ height: option.rowNum * option.data.height + 'px' }"
      class="rotation-container"
    >
      <ul class="rotation-list">
        <li
          v-for="(data, index) in dataList"
          :key="index"
          :style="{
            color: option.data.fontColor,
            height: option.data.height + 'px',
            lineHeight: option.data.height + 'px',
            fontSize: option.data.fontSize + 'px'
          }"
        >
          <span
            v-for="(dataItem, childIndex) in data"
            :key="childIndex"
            :style="{width: option.columnWidthList[childIndex]}"
          >{{ dataItem }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRotationListConfig } from '../../config/other/rotation-list-config'

export default {
  name: 'RotationList',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getRotationListConfig().option
      }
    },
    i: {
      type: undefined,
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
      timer: null,
      chartType: 'rotationList',
      columnList: [],
      columnWidthList: [],
      dataList: [],
      speed: this.option.speed
    }
  },
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.setData()
        this.$nextTick(function() {
          // 如果没有滚动，就设置
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
  async mounted() {
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    setTimer: function() {
      const speed = this.speed
      this.timer = setInterval(() => {
        // const $parent = $('#' + this.i).find('.rotation-list')
        // const $first = $parent.find('li:first')
        // const height = $first.height()
        // $first.animate({
        //   marginTop: -height + 'px'
        // }, 500, function() {
        //   $first.css('marginTop', 0).appendTo($parent)
        // })
      }, speed * 1000)
    },
    updateTimer() {
      clearInterval(this.timer)
      this.setTimer()
    },
    setData() {
      if (this.option.columnList.length === 0) {
        this.option.columnList = this.apiData.column
      }
      if (this.option.columnWidthList.length === 0) {
        const columnWidthList = []
        for (let i = 0; i < this.apiData.column.length; i++) {
          columnWidthList.push('100px')
        }
        this.option.columnWidthList = columnWidthList
      }
      this.dataList = this.apiData.value
    }
  }
}
</script>

<style>
  .rotation-column {
    padding: 0;
    font-weight: bold;
  }

  .rotation-column span {
    float: left;
    text-align: center;
  }

  .rotation-container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .rotation-list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
  }

  .rotation-list li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .rotation-list li span {
    display: inline-block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
