<template>
  <div class="upload-container" :style="{height: height}">
    <div class="upload-image">
      <div :style="getImageStyle()" />
    </div>
    <a-upload
      name="file"
      accept="image/*"
      :show-upload-list="false"
      :action="imageBasicUrl+'/api/v1/image/'"
    >
      <a-button class="upload-button" type="primary">上传</a-button>
    </a-upload>
    <div class="upload-handler">
      <a-icon class="image-upload" type="download" />
      <a-icon class="image-delete" type="delete" />
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/config'

export default {
  name: 'Index',
  props: {
    height: {
      type: String,
      default() {
        return '100px'
      }
    },
    imageUrl: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      imageBasicUrl: defaultSettings.imageBasicUrl
    }
  },
  methods: {
    getImageStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        width: '100%',
        height: '100%'
      }
    }
  }
}
</script>

<style lang="less">
.upload-container {
  position: relative;
  border-radius: 2px;
  background: var(--input-background);
  outline: 1px solid var(--input-background);
  transition: border 0.3s;

  .upload-image {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    outline-color: var(--primary-color) !important;

    .upload-button {
      display: block;
    }

    i {
      display: block;
    }
  }

  .upload-button {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  i {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 12px;
    color: #ffffff;
    font-size: 16px;
    width: 16px;
    margin: 0 4px;
  }

  .image-upload {
    right: 36px;
  }

  .image-delete {
    right: 12px;
  }
}

</style>
