<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <a-card :bordered="false">
      <a-list :grid="{ gutter: 20, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.title">
            <div class="thumbnails">
              <img :src="item.instance_view_thumbnail" class="image" alt="">
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
    },
    handlePreview() {

    },
    handleEdit(instance_id) {
      window.open('/dataViewInstance/index/' + instance_id + '/0')
    },
    handleDelete() {

    }
  }
}
</script>

<style>
.thumbnails {
  height: 130px;
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
  height: 130px;
  position: relative;
  text-align: center;
  top: -130px;
  z-index: 99999;
  display: none;
}

.thumbnails button {
  position: relative;
  z-index: 99999;
  top: -200px;
  padding: 5px 6px;
  margin: auto;
  display: none;
}
</style>
