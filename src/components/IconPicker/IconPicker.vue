<template>
  <a-dropdown ref="dropdown" v-model="visible" :trigger="['click']" placement="bottomCenter" :disabled="disabled">
    <a-card slot="overlay">
      <div class="ant-pro-icon-selector" :style="{ width: `${pickerWidth}px` }">
        <a-tabs v-model="currentTab" @change="handleTabChange">
          <a-tab-pane v-for="v in renderIcons" :key="v.key" :tab="v.title">
            <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '5px' } }" style="height: 200px">
              <ul>
                <li v-for="(icon, key) in v.icons" :key="`${v.key}-${key}`" :class="{ 'active': selectedIcon === icon }" @click="handleSelectedIcon(icon)">
                  <merge-icon :type="icon" :style="{ fontSize: '20px' }" />
                </li>
              </ul>
            </vue-scroll>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <span :class="{ 'icon-picker-select-render': true, 'icon-picker-disabled': disabled }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <span v-if="selectedIcon">
        <merge-icon :type="selectedIcon" class="select-icon" />图标被选中
      </span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <merge-icon class="picker-select-arrow" :style="{ fontSize: '16px' }" :type="allowIcon" :theme="allowIcon === 'down' ? 'outlined' : 'filled'" @click="handleClear" />
    </span>
  </a-dropdown>
</template>

<script>
import icons from './icons'
import MergeIcon from './merge-icon.js'
import VueScroll from 'vuescroll'

export default {
  name: 'IconPicker',
  components: {
    VueScroll,
    MergeIcon
  },
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    extraIcons: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      pickerWidth: 400,
      selectedIcon: this.value || '',
      currentTab: null,
      icons,
      allowIcon: 'down'
    }
  },
  computed: {
    renderIcons() {
      return this.extraIcons.concat(this.icons)
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedIcon = val
        this.autoSwitchTab()
      },
      immediate: true
    },
    visible: {
      handler(val) {
        if (val) {
          this.pickerWidth = this.$refs.dropdown.$el.offsetWidth
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.renderIcons.length > 0) {
      this.currentTab = this.renderIcons[0].key
    }
  },
  methods: {
    handleSelectedIcon(icon) {
      this.visible = false
      this.selectedIcon = icon
      this.$emit('input', icon)
      this.$emit('change', icon)
    },
    handleTabChange(activeKey) {
      this.currentTab = activeKey
    },
    autoSwitchTab() {
      icons.some(
        item =>
          item.icons.some(icon => icon === this.value) &&
          (this.currentTab = item.key)
      )
    },
    handleClear() {
      if (this.allowClear && this.selectedIcon) {
        this.visible = false
        this.selectedIcon = null
        this.$emit('input', null)
        this.$emit('change', null)
        this.allowIcon = 'down'
      }
    },
    handleMouseEnter() {
      if (this.allowClear) {
        this.allowIcon = this.selectedIcon ? 'close-circle' : 'down'
      }
    },
    handleMouseLeave() {
      this.allowIcon = 'down'
    }
  }
}
</script>

<style lang="less" scoped>
.icon-picker-select-render {
  position: relative;
  cursor: pointer;
  margin: 0;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;

  .placeholder {
    color: #ccc;
  }

  .picker-select-arrow {
    color: #ccc;
    right: 10px;
    position: absolute;
    line-height: 1.5;
  }

  .select-icon {
    margin-right: 10px;
  }

  &::after {
    display: inline-block;
    width: 0;
    visibility: hidden;
    content: ".";
    pointer-events: none;
  }
}

.icon-picker-disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

ul {
  list-style: none;
  padding: 0;
  height: 200px;

  li {
    display: inline-block;
    padding: 10px;
    margin: 3px 0;

    &:hover,
    &.active {
      cursor: pointer;
    }
  }
}
</style>
