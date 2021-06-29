<!--suppress JSUnresolvedVariable, JSUnusedLocalSymbols -->
<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-panel key="图片配置" header="图片配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="选择图片">
            <a-select v-model="item.option.url">
              <a-select-option
                v-for="image in imageList"
                :key="image.image_path"
                :value="image.image_path"
              >
                {{ image.image_name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="上传图片">
            <upload-image
              height="120px"
              :image-type="'other_image_chart'"
              :image-url="item.option.url"
              @uploaded="handleImageUploaded"
            />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="样式配置" header="样式配置">
        <a-form layout="horizontal" :label-col="{span: 6}" :wrapper-col="{span: 14, offset: 1}">
          <a-form-item label="X旋转">
            <a-input-number v-model="item.option.rotateX" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="Y旋转">
            <a-input-number v-model="item.option.rotateY" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="X缩放">
            <a-input-number v-model="item.option.scaleX" :min="0" :precision="1" />
          </a-form-item>
          <a-form-item label="Y缩放">
            <a-input-number v-model="item.option.scaleY" :min="0" :precision="1" />
          </a-form-item>
          <a-form-item label="X偏移">
            <a-input-number v-model="item.option.translateX" :min="0" :precision="0" />
          </a-form-item>
          <a-form-item label="Y偏移">
            <a-input-number v-model="item.option.translateY" :min="0" :precision="0" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage'
import { getImageList } from '@/api/image'

export default {
  name: 'ImageChartOption',
  components: {
    UploadImage
  },
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
      imageList: []
    }
  },
  mounted() {
    this.getImageList()
  },
  methods: {
    async getImageList() {
      const response = await getImageList({
        'imageType': 'other_image_chart'
      })
      this.imageList = response.data
    },
    handleImageUploaded(url) {
      this.item.option.url = url
    }
  }
}
</script>
