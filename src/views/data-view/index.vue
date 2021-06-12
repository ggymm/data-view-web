<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <a-card :bordered="false">
      <div class="handle">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleCreatePro">新建（Pro）</a-button>
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
      <!-- xs: <576px; sm: ≥576px -->
      <!-- md: ≥768px; lg: ≥992px -->
      <!-- xl: ≥1200px; xxl: ≥1600px -->
      <a-list :grid="{ gutter: 20, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>
            <div slot="cover" class="thumbnails">
              <img :src="imageBasicUrl + item.instance_view_thumbnail" class="image" alt="">
              <div class="edit-shade" />
              <a-button type="primary" @click="handleEdit(item.instance_id)">编辑</a-button>
            </div>
            <template slot="actions">
              <a-tooltip title="预览" @click="handlePreview(item.instance_id)">
                <a-icon type="picture" />
              </a-tooltip>
              <a-tooltip title="编辑" @click="handleEdit(item.instance_id)">
                <a-icon type="edit" />
              </a-tooltip>
              <a-tooltip title="删除" @click="handleDelete(item.instance_id)">
                <a-icon type="delete" />
              </a-tooltip>
            </template>
            <a-card-meta :title="item.instance_title || '暂无标题'" />
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import defaultSettings from '@/config'
import { getDataViewPage } from '@/api/data-view'

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
    async getData() {
      this.loading = true
      const response = await getDataViewPage({
        page: this.pagination.current,
        size: this.pagination.pageSize
      })
      this.loading = false
      this.list = response.data.list
      this.pagination.total = response.data.count
    },
    handleFilter() {
    },
    handleCreatePro() {
      window.open('/data-view-web/data-view-instance-pro/index')
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
      window.open('/data-view-web/data-view-instance-pro/index/' + instance_id + '/0')
    },
    handleDelete() {
    }
  }
}
</script>

<style lang="less">
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

.ant-card-meta-title {
  text-align: center;
}
</style>
