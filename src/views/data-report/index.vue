<template>
  <div>
    <a-card :bordered="false">
      <div class="handle">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleCreate">新建</a-button>
        </div>
        <div class="space" />
        <div class="handle-query">
          <a-input
            v-model="query.instanceName"
            class="handle-item handle-item-width handle-item-margin"
            style="width: 200px"
            allow-clear
          />
          <a-button class="handle-item" type="primary" @click="handleFilter">查询</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      query: {
        instanceName: null
      }
    }
  },
  methods: {
    async getData() {
    },
    handleFilter() {
    },
    handleCreate() {
      window.open('/data-view-web/data-view-instance/index')
    }
  }
}
</script>

<style scoped>

</style>
