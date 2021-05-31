<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <a-card :bordered="false">
      <div class="handle">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleCreate">新建</a-button>
          <a-button type="primary" icon="bug" @click="handleDebug">调试</a-button>
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
      <a-list :grid="{ gutter: 20, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.title">
            <div class="thumbnails">
              <img :src="imageBasicUrl + item.instance_view_thumbnail" class="image" alt="">
              <div class="edit-shade" />
              <a-button type="primary" @click="handleEdit(item.instance_id)">编辑</a-button>
            </div>
            <div class="title">
              <span>{{ item.instance_title || '暂无标题' }}</span>
            </div>
            <div class="handle">
              <a-button type="link" icon="picture" @click="handlePreview(item.instance_id)">预览</a-button>
              <a-button type="link" icon="edit" @click="handleEdit(item.instance_id)">编辑</a-button>
              <a-button type="link" icon="delete" @click="handleDelete(item.instance_id)">删除</a-button>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import defaultSettings from '@/config'
import { getDataViewPage } from '@/api/dataView'

export default {
  name: 'Index',
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl,
      list: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      query: {
        instanceName: null
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
    },
    handleFilter() {

    },
    handleCreate() {
      window.open('/data-view-web/data-view-instance/index')
    },
    handleDebug() {
      window.open('/data-view-web/data-view-debug/index')
    },
    handlePreview(instance_id) {
      window.open('/data-view-web/data-view-instance/preview/' + instance_id)
    },
    handleEdit(instance_id) {
      window.open('/data-view-web/data-view-instance/index/' + instance_id + '/0')
    },
    handleDelete() {

    }
  }
}
</script>

<style>
.thumbnails {
  height: 160px;
}

.thumbnails:hover .edit-shade {
  display: block;
}

.thumbnails:hover button {
  display: block;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.title {
  width: 70%;
  margin: auto;
  padding: 10px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  font-size: 13px;
  border-bottom: 1px solid #e1e1e1;
}

.handle {
  text-align: center;
}

.thumbnails .edit-shade {
  background: #000000 none repeat scroll 0 0;
  opacity: 0.5;
  height: 160px;
  position: relative;
  text-align: center;
  top: -160px;
  z-index: 99999;
  display: none;
}

.thumbnails button {
  position: relative;
  z-index: 99999;
  top: -250px;
  padding: 5px 6px;
  margin: auto;
  display: none;
}
</style>
