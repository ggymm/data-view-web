<template>
  <a-layout style="height: 100vh">
    <a-layout-sider>
      <a-menu mode="inline" theme="dark">
        <a-menu-item key="dataSource" @click="dataSource()">
          <span>数据源</span>
        </a-menu-item>
        <a-menu-item key="dataView" @click="dataView()">
          <span>大屏设计</span>
        </a-menu-item>
        <a-menu-item key="dataReport" @click="dataReport()">
          <span>报表设计</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <router-view />
    </a-layout>
  </a-layout>
</template>

<script>

export default {
  name: 'AdminLayout',
  methods: {
    dataSource() {
      this.$router.push({ name: 'DataSource' })
    },
    dataView() {
      this.$router.push({ name: 'DataView' })
    },
    dataReport() {
      this.$router.push({ name: 'DataReport' })
    }
  }
}
</script>

<style lang="less">
</style>
