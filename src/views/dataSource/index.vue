<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <a-card :bordered="false">
      <div class="handle">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleCreate">新建</a-button>
          <a-button type="primary" icon="upload" @click="handleImport">导入</a-button>
        </div>
        <div class="space" />
        <div class="handle-query">
          <a-input
            v-model="query.username"
            class="handle-item handle-item-width handle-item-margin"
            style="width: 200px"
            placeholder="请填写用户名称"
            allow-clear
          />
          <a-button class="handle-item" type="primary" @click="handleFilter">查询</a-button>
        </div>
      </div>
      <a-table
        bordered
        size="middle"
        :columns="columns"
        :row-key="record => record.data_source_id"
        :data-source="list"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </span>
        <span slot="handler" slot-scope="text, record" class="handler">
          <a-space>
            <a-button type="primary" size="small" @click="handleEdit(record.data_source_id)">编辑</a-button>
            <a-button type="danger" size="small" @click="handleDelete(record.data_source_id)">删除</a-button>
          </a-space>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getDataSourcePage } from '@/api/dataSource'

const columns = [
  {
    align: 'center',
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    width: '5%'
  },
  {
    title: '名称',
    dataIndex: 'data_source_name',
    width: '15%'
  },
  {
    title: '类型',
    dataIndex: 'data_source_type',
    width: '10%'
  },
  {
    title: '数据库名称',
    dataIndex: 'data_source_database_name',
    width: '15%'
  },
  {
    title: '地址',
    dataIndex: 'data_source_ip',
    width: '10%'
  },
  {
    title: '登录账户',
    dataIndex: 'data_source_username',
    width: '10%'
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    width: '20%'
  },
  {
    align: 'center',
    title: '操作',
    scopedSlots: { customRender: 'handler' }
  }
]

export default {
  name: 'Index',
  data() {
    // noinspection JSUnusedGlobalSymbols
    return {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        defaultCurrent: 1,
        defaultPageSize: 10,
        showSizeChanger: true,
        total: 0,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: total => `共 ${total} 条`,
        onShowSizeChange: (current, size) => {
          this.pagination.current = current
          this.pagination.pageSize = size
          this.getData()
        },
        onChange: (current, size) => {
          this.pagination.current = current
          this.pagination.pageSize = size
          this.getData()
        }
      },
      loading: false,
      columns,
      query: {
        username: null
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleTableChange(pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getData()
    },
    getData() {
      this.loading = true
      getDataSourcePage({
        page: this.pagination.current,
        size: this.pagination.pageSize
      }).then(response => {
        this.loading = false
        this.list = response.data.list
        this.pagination.total = response.data.count
      })
    },
    handleFilter() {
      this.pagination.current = 1
      this.getData()
    },
    handleCreate() {

    },
    handleEdit() {

    },
    handleDelete() {

    },
    handleImport() {

    }
  }
}
</script>

<style scoped>

</style>
