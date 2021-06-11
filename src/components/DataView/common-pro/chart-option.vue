<template>
  <div>
    <component
      :is="currentItem.chartType + 'Option'"
      :item="currentItem"
      :data-source-list="dataSourceList"
    />
    <modal-pro
      :title="'SQL编辑器'"
      :visible="visibleSQLModel"
    >
      这里是弹窗内容
    </modal-pro>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '../components/options'
import ModalPro from '@/components/ModelPro'

export default {
  name: 'ChartOption',
  components: {
    ModalPro
  },
  props: {
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visibleSQLModel: false
    }
  },
  computed: mapState([
    'currentItem'
  ]),
  mounted() {
    this.$bus.$on('handleEditSQL', () => {
      this.handleEditSQL()
    })
  },
  methods: {
    handleDeleteItem(item) {
    },
    handleEditOption(option) {
    },
    handleEditSQL() {
      this.visibleSQLModel = true
    }
  }
}
</script>
