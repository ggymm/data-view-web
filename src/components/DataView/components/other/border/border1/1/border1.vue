<template>
  <div class="border-box-1">
    <svg class="border" :width="item.width" :height="item.height">
      <polygon
        :fill="item.option.backgroundColor"
        :points="`10, 27 10, ${item.height - 27} 13, ${item.height - 24} 13, ${item.height - 21} 24, ${item.height - 11}
      38, ${item.height - 11} 41, ${item.height - 8} 73, ${item.height - 8} 75, ${item.height - 10} 81, ${item.height - 10}
      85, ${item.height - 6} ${item.width - 85}, ${item.height - 6} ${item.width - 81}, ${item.height - 10} ${item.width - 75}, ${item.height - 10}
      ${item.width - 73}, ${item.height - 8} ${item.width - 41}, ${item.height - 8} ${item.width - 38}, ${item.height - 11}
      ${item.width - 24}, ${item.height - 11} ${item.width - 13}, ${item.height - 21} ${item.width - 13}, ${item.height - 24}
      ${item.width - 10}, ${item.height - 27} ${item.width - 10}, 27 ${item.width - 13}, 25 ${item.width - 13}, 21
      ${item.width - 24}, 11 ${item.width - 38}, 11 ${item.width - 41}, 8 ${item.width - 73}, 8 ${item.width - 75}, 10
      ${item.width - 81}, 10 ${item.width - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
      />
    </svg>

    <svg
      v-for="b in item.option.border"
      :key="b"
      width="150px"
      height="150px"
      :class="`${b} border`"
    >
      <polygon
        :fill="item.option.color[0]"
        points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
          attributeName="fill"
          :values="`${item.option.color[0]};${item.option.color[1]};${item.option.color[0]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="item.option.color[1]"
        points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"
      >
        <animate
          attributeName="fill"
          :values="`${item.option.color[1]};${item.option.color[0]};${item.option.color[1]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="item.option.color[0]"
        points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
          attributeName="fill"
          :values="`${item.option.color[0]};${item.option.color[1]};transparent`"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Border1',
  props: {
    item: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.border-box-1 {
  position: relative;
  width: 100%;
  height: 100%;

  .border {
    position: absolute;
    display: block;
  }

  .right-top {
    right: 0;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }

  .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
