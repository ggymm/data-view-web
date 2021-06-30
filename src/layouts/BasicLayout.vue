<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :media-query="query"
    :is-mobile="isMobile"
    :footer-render="false"
    :handle-media-query="handleMediaQuery"
    :handle-collapse="handleCollapse"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <h1>{{ title }}</h1>
      </div>
    </template>

    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <router-view :key="$route.fullPath" />
  </pro-layout>
</template>

<script>
import { asyncRouterMap, constantRouterMap } from '@/router/router.config'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config'
import RightContent from '@/components/GlobalHeader/RightContent'

export default {
  name: 'BasicLayout',
  components: {
    RightContent
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,

      mainMenu: constantRouterMap.concat(asyncRouterMap)
    }
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    }
  }
}
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
