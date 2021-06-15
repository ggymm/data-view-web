<template>
  <div class="data-view-chart-option">
    暂无
  </div>
</template>

<script>
export default {
  name: 'PictureOption',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'style',
      fileList: []
    }
  },
  methods: {
    handleDelete() {
      this.$confirm('是否删除该图表?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('handleDeleteItem', this.item)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleImageUpload(file) {
      if (file.file.size <= 512 * 1024) {
        const itemId = 'picture_' + this.item.elId
        const a = new FileReader()
        a.onload = function(e) {
          const cv = document.getElementById(itemId)
          const canvas = cv.getContext('2d')
          const img = new Image()
          img.onload = function() {
            cv.width = img.width
            cv.height = img.height
            canvas.drawImage(img, 0, 0)
          }
          img.src = e.target.result
        }
        a.readAsDataURL(file.file)
      } else {
        this.$message.error('请上传小于512kb的图片')
      }
    },
    handleEditOption() {
      this.$emit('handleEditOption', this.item.option)
    }
  }
}
</script>
