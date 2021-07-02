<template>
  <div v-show="contextmenuShow" :style="style()">
    <ul class="ant-dropdown-menu" @mouseup="handleMouseup">
      <template v-if="currentItem">
        <li class="ant-dropdown-menu-item">
          <a-icon type="vertical-align-top" />
          置顶
        </li>
        <li class="ant-dropdown-menu-item">
          <a-icon type="vertical-align-bottom" />
          置底
        </li>
        <li class="ant-dropdown-menu-item">
          <a-icon type="arrow-up" />
          上移一层
        </li>
        <li class="ant-dropdown-menu-item">
          <a-icon type="arrow-down" />
          下移一层
        </li>
        <li class="ant-dropdown-menu-item-divider" />
        <li class="ant-dropdown-menu-item">
          <a-icon type="eye-invisible" />
          隐藏
        </li>
        <li class="ant-dropdown-menu-item-divider" />
        <li class="ant-dropdown-menu-item" @click="copy">
          <a-icon type="copy" />
          复制
        </li>
        <li class="ant-dropdown-menu-item">
          <a-icon type="delete" />
          删除
        </li>
      </template>
      <template v-else>
        <li class="ant-dropdown-menu-item" @click="paste">
          <a-icon type="copy" />
          粘贴
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Contextmenu',
  computed: mapState([
    'currentItem',
    'contextmenuShow',
    'contextmenuTop',
    'contextmenuLeft'
  ]),
  methods: {
    style() {
      return {
        zIndex: 9999,
        position: 'absolute',
        top: `${this.contextmenuTop}px`,
        left: `${this.contextmenuLeft}px`
      }
    },
    handleMouseup() {
      // 不取消当前组件的选中状态
      this.$store.commit('setClickItem', true)
    },
    copy() {
      this.$store.commit('itemCopy')
    },
    paste() {
      this.$store.commit('itemPaste', true)
    }
  }
}
</script>
