<template>
  <div class="layout-ruler">
    <div class="ruler-wrapper h-container" :style="`transform: translateX(-${hScroll}px);`" />
    <div class="ruler-wrapper v-container" :style="`transform: rotate(90deg) translateX(-${vScroll}px);`" />
    <div title="切换参考线" class="ruler-corner" @click="toggleGuides">
      <a-icon type="eye" style="z-index: 9;" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { on, off, $ } from '@/utils/dom'
import { RulerBuilder } from './ruler'

export default {
  name: 'Ruler',
  data() {
    return {
      visible: true,
      hRuler: null,
      vRuler: null,
      hScroll: 0,
      vScroll: 0
    }
  },
  computed: mapState([
    'canvasConfig',
    'screenConfig',
    'currentItem'
  ]),
  watch: {
    canvasConfig: {
      deep: true,
      handler() {
        if (this.hRuler) {
          this.hRuler.setSize(this.canvasConfig.width + 100, 20, this.canvasConfig.scale)
        } else {
          this.initHRuler()
        }

        if (this.vRuler) {
          this.vRuler.setSize(this.canvasConfig.width + 100, 20, this.canvasConfig.scale)
        } else {
          this.initVRuler()
        }
      }
    }
  },
  mounted() {
    this.initHRuler()
    this.initVRuler()

    on($('#screenWrapper'), 'scroll', this.onScroll)
  },
  destroyed() {
    off($('#screenWrapper'), 'scroll', this.onScroll)
  },
  methods: {
    initHRuler() {
      this.hRuler = new RulerBuilder(
        $('.h-container'), {
          direction: 'TB',
          width: this.canvasConfig.width + 100,
          scale: this.canvasConfig.scale
        }
      )
    },
    initVRuler() {
      this.vRuler = new RulerBuilder(
        $('.v-container'), {
          direction: 'LR',
          width: this.canvasConfig.height + 100,
          scale: this.canvasConfig.scale
        })
    },
    toggleGuides() {
      if (this.hRuler && this.vRuler) {
        this.visible = !this.visible
        this.hRuler.toggleGuide(this.visible)
        this.vRuler.toggleGuide(this.visible)
      }
    },
    onScroll(e) {
      const dom = e.target
      this.hScroll = dom.scrollLeft
      this.vScroll = dom.scrollTop
    }
  }
}
</script>

<style lang="less">

@line-color: #409eff;

.layout-ruler {
  position: fixed;
  z-index: 1;

  .ruler-wrapper {
    position: absolute;
    height: 20px;

    .lines-wrapper {

      .ruler-line {
        position: absolute;

        .line-action {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          color: #fff;
          padding: 0 4px;
          border-radius: 1px;
          box-shadow: 0 0 5px -3px #000000;
          background: #5151a2;

          .line-value {
            pointer-events: none;
          }
        }
      }
    }

    .ruler-indicator {
      position: absolute;
      pointer-events: none;

      .indicator-value {
        position: absolute;
        background: #5151a2;
        color: #ffffff;
        border-radius: 1px;
        padding: 0 4px;
      }
    }
  }

  .h-container {
    left: 20px;
    cursor: col-resize;
    transform: translateX(0);

    .ruler-line {
      top: 0;
      height: 100vh;
      padding-left: 5px;
      border-left: 1px solid @line-color;

      .line-action {
        top: 5px;
      }
    }

    .ruler-indicator {
      border-right: 1px dashed @line-color;
      top: 0;
      height: 100vw;

      .indicator-value {
        font-family: arial, sans-serif;
        top: 5px;
        left: 10px;
      }
    }
  }

  .v-container {
    cursor: row-resize;
    transform: rotate(90deg) translateX(0);
    transform-origin: 0 100% 0;

    .lines-wrapper {
      transform: rotate(-90deg);
      transform-origin: 0 100% 0;
    }

    .ruler-line {
      left: 3px;
      width: 100vw;
      padding-bottom: 5px;
      border-top: 1px solid @line-color;

      .line-action {
        top: 5px;
        left: 5px;
        transform: rotate(0deg);
      }
    }

    .ruler-indicator {
      border-top: 1px dashed @line-color;
      width: 100vw;
      bottom: 1px;
      transform: rotate(-90deg);
      transform-origin: 1px 100% 0;

      .indicator-value {
        transform-origin: 0 0;
        transform: rotate(0deg);
        top: 10px;
        left: 25px;
      }
    }
  }

  .ruler-corner {
    position: fixed;
    z-index: 999;
    display: flex;
    width: 20px;
    height: 20px;
    font-size: 15px;
    color: #bcc9d4;
    cursor: pointer;
    background: #0e1013;
    border-right: 1px solid rgba(161, 174, 179, 0.8);
    border-bottom: 1px solid rgba(161, 174, 179, 0.8);
    align-items: center;
    justify-content: center;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>
