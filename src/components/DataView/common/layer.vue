<template>
  <div>
    <div class="layer-header">
      <span>图层</span>
      <span class="handler">
        <a-icon type="left" />
      </span>
    </div>
    <div class="layer-wrapper">
      布局
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layer'
}
</script>

<style lang="less">
.data-view-layer {
  .layer-header {
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #ffffff;
    background-color: #2d343c;

    .handler {
      float: right;
    }
  }
}
</style>
