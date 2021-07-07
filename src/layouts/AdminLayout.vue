<template>
  <a-layout>
    <a-layout-sider>
      <a-button type="primary" @click="dataSource()">数据源</a-button>
      <a-button type="primary" @click="dataView()">大屏设计</a-button>
      <a-button type="primary" @click="dataReport()">报表设计</a-button>
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
