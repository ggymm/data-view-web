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
      <!-- xs: <576px; sm: ≥576px -->
      <!-- md: ≥768px; lg: ≥992px -->
      <!-- xl: ≥1200px; xxl: ≥1600px -->
      <a-list :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 6 }" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item" class="data-view-item">
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
      routerBase: defaultSettings.routerBase,
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
    handleCreate() {
      window.open(this.routerBase + 'data-view-instance/create')
    },
    handleDebug() {
      window.open(this.routerBase + 'data-view-debug/index')
    },
    handlePreview(instance_id) {
      window.open(this.routerBase + 'data-view-instance/preview/' + instance_id)
    },
    handleEdit(instance_id) {
      window.open(this.routerBase + 'data-view-instance/edit/' + instance_id + '/0')
    },
    handleDelete() {
    }
  }
}
</script>

<style lang="less">
.data-view-item {
  .ant-card-meta-title {
    text-align: center;
  }

  .ant-card-body {
    padding: 10px;
  }

  .thumbnails {
    position: relative;
    height: 180px;

    &:hover {
      .edit-shade {
        display: block;
      }

      button {
        display: block;
      }
    }

    .edit-shade {
      background: #000000 none repeat scroll 0 0;
      opacity: 0.5;
      height: 180px;
      position: relative;
      text-align: center;
      top: -180px;
      z-index: 99;
      display: none;
    }

    button {
      position: absolute;
      z-index: 999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    display: block;
  }
}

</style>
