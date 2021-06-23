<template>
  <a-modal
    id="config-modal"
    :footer="null"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    :keyboard="false"
  >
    <div class="modal-header">
      <div class="title">{{ title }}</div>
      <div id="drag" class="space" />
      <div class="handle">
        <i class="modal-icon" :class="{'hidden': !max}" @click="restore">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M3 5v9h9V5H3zm8 8H4V6h7v7z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5h1V4h7v7h-1v1h2V3H5v2z" />
          </svg>
        </i>
        <i class="modal-icon" :class="{'hidden': max}" @click="maximize">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z" />
          </svg>
        </i>
        <i class="modal-icon close" @click="close">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
            />
          </svg>
        </i>
      </div>
    </div>
    <div class="modal-content" :style="{ height: (modalHeight - 75) + 'px' }">
      <slot />
    </div>
    <div class="modal-footer">
      <a-button @click="close">取消</a-button>
      <a-button type="primary" @click="confirm">确定</a-button>
    </div>
    <div class="resize-bar">
      <div id="resize-left" />
      <div id="resize-right" />
      <div id="resize-top" />
      <div id="resize-bottom" />
      <div id="resize-left-top" />
      <div id="resize-right-top" />
      <div id="resize-left-bottom" />
      <div id="resize-right-bottom" />
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      max: false,
      modalWidth: null,
      modalHeight: null
    }
  },
  watch: {
    visible: function(visible) {
      if (visible) {
        this.$nextTick(() => {
          this.initDrag()
        })
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.$nextTick(() => {
        this.initDrag()
      })
    }
  },
  methods: {
    initDrag() {
      const width = document.body.clientWidth
      const height = document.body.clientHeight

      if (this.width) {
        if (this.width.endsWith('%')) {
          const present = parseInt(this.width.replace('%', ''))
          this.modalWidth = width * present / 100
        } else if (this.width.endsWith('px')) {
          this.modalWidth = this.width.replace('px', '')
        } else {
          this.modalWidth = parseInt(this.width)
        }
      } else {
        this.modalWidth = width / 2
      }
      if (this.height) {
        if (this.width.endsWith('%')) {
          const present = parseInt(this.height.replace('%', ''))
          this.modalHeight = height * present / 100
        } else if (this.height.endsWith('px')) {
          this.modalHeight = this.height.replace('px', '')
        } else {
          this.modalHeight = parseInt(this.height)
        }
      } else {
        this.modalHeight = height / 4 * 3
      }
      const container = document.querySelector('#config-modal > div > div.ant-modal')
      container.style.top = (height - this.modalHeight) / 2 + 'px'
      container.style.left = (width - this.modalWidth) / 2 + 'px'
      container.style.width = this.modalWidth + 'px'
      container.style.height = this.modalHeight + 'px'

      const _this = this
      let x = 0
      let y = 0
      let l = 0
      let r = 0
      let t = 0
      let b = 0
      let type = ''
      let isDown = false

      const drag = document.getElementById('drag')
      drag.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'drag'
        x = e.clientX
        y = e.clientY
        l = container.offsetLeft
        t = container.offsetTop
      }
      const resizeLeft = document.getElementById('resize-left')
      resizeLeft.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'left'
        r = container.offsetLeft + container.offsetWidth
      }
      const resizeRight = document.getElementById('resize-right')
      resizeRight.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'right'
        l = container.offsetLeft
      }
      const resizeTop = document.getElementById('resize-top')
      resizeTop.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'top'
        b = container.offsetTop + container.offsetHeight
      }
      const resizeBottom = document.getElementById('resize-bottom')
      resizeBottom.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'bottom'
        t = container.offsetTop
      }
      const resizeLeftTop = document.getElementById('resize-left-top')
      resizeLeftTop.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'left-top'
        r = container.offsetLeft + container.offsetWidth
        b = container.offsetTop + container.offsetHeight
      }
      const resizeRightTop = document.getElementById('resize-right-top')
      resizeRightTop.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'right-top'
        l = container.offsetLeft
        b = container.offsetTop + container.offsetHeight
      }
      const resizeLeftBottom = document.getElementById('resize-left-bottom')
      resizeLeftBottom.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'left-bottom'
        r = container.offsetLeft + container.offsetWidth
        t = container.offsetTop
      }
      const resizeRightBottom = document.getElementById('resize-right-bottom')
      resizeRightBottom.onmousedown = function(e) {
        e.preventDefault()
        isDown = true
        type = 'right-bottom'
        l = container.offsetLeft
        t = container.offsetTop
      }

      document.onmousemove = function(e) {
        if (!isDown) {
          return
        }
        switch (type) {
          case 'drag':
            container.style.top = e.clientY - (y - t) + 'px'
            container.style.left = e.clientX - (x - l) + 'px'
            break
          case 'left':
            container.style.left = e.clientX + 'px'
            container.style.width = r - e.clientX + 'px'
            this.modalWidth = r - e.clientX
            break
          case 'right':
            container.style.width = e.clientX - l + 'px'
            this.modalWidth = e.clientX - l
            break
          case 'top':
            container.style.top = e.clientY + 'px'
            container.style.height = b - e.clientY + 'px'
            _this.modalHeight = b - e.clientY
            break
          case 'bottom':
            container.style.height = e.clientY - t + 'px'
            _this.modalHeight = e.clientY - t
            break
          case 'left-top':
            // left
            container.style.left = e.clientX + 'px'
            container.style.width = r - e.clientX + 'px'
            this.modalWidth = r - e.clientX
            // top
            container.style.top = e.clientY + 'px'
            container.style.height = b - e.clientY + 'px'
            _this.modalHeight = b - e.clientY
            break
          case 'right-top':
            // right
            container.style.width = e.clientX - l + 'px'
            this.modalWidth = e.clientX - l
            // top
            container.style.top = e.clientY + 'px'
            container.style.height = b - e.clientY + 'px'
            _this.modalHeight = b - e.clientY
            break
          case 'left-bottom':
            // left
            container.style.left = e.clientX + 'px'
            container.style.width = r - e.clientX + 'px'
            this.modalWidth = r - e.clientX
            // bottom
            container.style.height = e.clientY - t + 'px'
            _this.modalHeight = e.clientY - t
            break
          case 'right-bottom':
            // right
            container.style.width = e.clientX - l + 'px'
            this.modalWidth = e.clientX - l
            // bottom
            container.style.height = e.clientY - t + 'px'
            _this.modalHeight = e.clientY - t
            break
          default:
            break
        }
      }

      document.onmouseup = function() {
        x = y = l = r = t = b = 0
        isDown = false
      }
    },
    restore() {
    },
    maximize() {
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="less">
#config-modal {
  div, span, label {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .ant-modal-mask {
    background-color: transparent;
  }

  .ant-modal-wrap {
    overflow: hidden;

    .ant-modal {
      position: absolute;
      padding: 0;
      animation-duration: .1s;
      animation-fill-mode: both;
      transition: transform, opacity 0.5s, 0.5s, ease, ease;

      .ant-modal-content {
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #3baced;
        border-radius: 5px;
        box-shadow: 1px 1px 24px rgba(0, 0, 0, 0.3);

        .ant-modal-close {
          display: none;
        }

        .ant-modal-header {
          display: none;
        }

        .ant-modal-body {
          padding: 0;

          .modal-header {
            display: flex;
            height: 30px;
            line-height: 30px;
            background: rgb(255, 255, 255);

            .title {
              display: inline-block;
              padding: 0 5px;
              max-width: 100px;
              font-size: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              white-space: nowrap;
            }

            .space {
              flex-grow: 1;
            }

            .handle {
              .modal-icon {
                font-size: 18px;
                width: 45px;
                line-height: 30px;
                display: inline-block;
                text-align: center;

                &:hover {
                  background-color: #e5e5e5;
                }

                &.close:hover {
                  color: #fff;
                  background-color: #e81123;
                }
              }

              .hidden {
                display: none !important;
              }
            }
          }

          .modal-content {
            overflow-x: hidden;
            overflow-y: auto;

            &::-webkit-scrollbar {
              width: 8px;
              height: 8px;
              background: transparent;
              position: absolute;
            }

            &::-webkit-scrollbar-corner {
              background: 0 0;
            }

            &::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, .3);
              background-clip: padding-box;
            }

            &::-webkit-scrollbar-track {
              background-color: transparent;
            }
          }

          .modal-footer {
            padding: 5px;
            text-align: center;

            > button:first-child {
              margin-right: 20px;
            }

            button {
              height: 30px;
            }
          }

          .resize-bar {
            overflow: hidden;
            touch-action: none;

            & > [class^=resize-] {
              z-index: 9999;
            }

            #resize-left {
              position: absolute;
              left: 0;
              top: 5px;
              bottom: 5px;
              width: 5px;
              cursor: w-resize;
            }

            #resize-right {
              position: absolute;
              right: 0;
              top: 5px;
              bottom: 5px;
              width: 5px;
              cursor: w-resize;
            }

            #resize-top {
              position: absolute;
              top: 0;
              left: 5px;
              right: 5px;
              height: 5px;
              cursor: n-resize;
            }

            #resize-bottom {
              position: absolute;
              bottom: 0;
              left: 5px;
              right: 5px;
              height: 5px;
              cursor: n-resize;
            }

            #resize-left-top {
              position: absolute;
              top: 0;
              left: 0;
              width: 5px;
              height: 5px;
              cursor: nw-resize;
            }

            #resize-right-top {
              position: absolute;
              top: 0;
              right: 0;
              width: 5px;
              height: 5px;
              cursor: ne-resize;
            }

            #resize-left-bottom {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 5px;
              height: 5px;
              cursor: sw-resize;
            }

            #resize-right-bottom {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 5px;
              height: 5px;
              cursor: se-resize;
            }
          }
        }
      }
    }
  }
}
</style>
