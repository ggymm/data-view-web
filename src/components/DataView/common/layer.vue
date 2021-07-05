<template>
  <div class="data-view-layer">
    <div class="layer-header">图层</div>
    <div class="layer-wrapper">
      <template v-for="(item, index) in items">
        <a-dropdown :key="index" :trigger="['contextmenu']">
          <div
            :id="`layer-${item.elId}`"
            :class="['layer-item', {'active': item === currentItem}]"
            @mousedown="handleSelect(item, index)"
            @mouseenter="item.hover = true"
            @mouseleave="item.hover = false"
          >
            <span class="layer-item-icon">
              <icon :type="`icon-${item.chartType}New`" />
            </span>
            <span class="layer-item-label">
              <span v-if="item.chartType === 'TitleText'">{{ item.option.title }}</span>
              <span v-else-if="item.chartType === 'ImageChart'">{{ item.chartName }}</span>
              <span v-else-if="item.chartType === 'CarouselList'">{{ item.chartName }}</span>
              <span v-else-if="item.chartType === 'Counter'">{{ item.chartName }}</span>
              <span v-else>
                <span v-if="item.chartName.length !== 0">
                  {{ item.chartName }}
                </span>
                <span v-else>
                  {{ item.option.title.text }}
                </span>
              </span>
            </span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click="handleTop(index)">
              <a-icon type="vertical-align-top" />
              置顶
            </a-menu-item>
            <a-menu-item @click="handleBottom(index)">
              <a-icon type="vertical-align-bottom" />
              置底
            </a-menu-item>
            <a-menu-item @click="handleUp(index)">
              <a-icon type="arrow-up" />
              上移一层
            </a-menu-item>
            <a-menu-item @click="handleDown(index)">
              <a-icon type="arrow-down" />
              下移一层
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item v-if="item.lock === 'false'" @click="item.lock = 'true'">
              <a-icon type="lock" />
              锁定
            </a-menu-item>
            <a-menu-item v-if="item.lock === 'true'" @click="item.lock = 'false'">
              <a-icon type="unlock" />
              解锁
            </a-menu-item>
            <a-menu-item v-if="item.show === 'true'" @click="item.show = 'false'">
              <a-icon type="eye-invisible" />
              隐藏
            </a-menu-item>
            <a-menu-item v-if="item.show === 'false'" @click="item.show = 'true'">
              <a-icon type="eye" />
              显示
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="handleCopy(index)">
              <a-icon type="copy" />
              复制
            </a-menu-item>
            <a-menu-item @click="handleDelete(index)">
              <a-icon type="delete" />
              删除
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { $ } from '@/utils/dom'

export default {
  name: 'Layer',
  computed: mapState([
    'items',
    'currentItem'
  ]),
  mounted() {
    this.$bus.$on('layer:itemChange', () => {
      if (this.currentItem !== null) {
        $(`#layer-${this.currentItem.elId}`).scrollIntoView({ behavior: 'smooth' })
      }
    })
  },
  methods: {
    handleSelect(item, index) {
      this.$store.commit('setCurrentItem', { item: item, index: index })
    },
    handleTop(index) {
      this.$store.commit('moveItem', { i: index, type: 'top' })
    },
    handleBottom(index) {
      this.$store.commit('moveItem', { i: index, type: 'bottom' })
    },
    handleUp(index) {
      this.$store.commit('moveItem', { i: index, type: 'up' })
    },
    handleDown(index) {
      this.$store.commit('moveItem', { i: index, type: 'down' })
    },
    handleCopy(item) {
      // 优化，如果复制标题文本，添加Copy
    },
    handleDelete(item) {
    }
  }
}
</script>
