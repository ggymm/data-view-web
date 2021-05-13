<template>
  <div>
    <a-card :bordered="false">
      <a-list :grid="{ gutter: 20, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.title">
            Card content
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { getDataViewPage } from '@/api/dataView'

export default {
  name: 'Index',
  data() {
    return {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getDataViewPage({
        page: this.pagination.current,
        size: this.pagination.pageSize
      }).then(response => {
        this.loading = false
        this.list = response.data.list
        this.pagination.total = response.data.count
      })
    }
  }
}
</script>

<style scoped>

</style>
