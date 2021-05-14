<template>
  <div id="modal-overlay">
    <div class="modal-data">
      <div style="text-align:center;">
        <v-loading style="display:inline-block;" />
      </div>
      <label class="warning">正在加载……</label>
    </div>
  </div>
</template>
<script>
import VLoading from './loading.vue'

export default {
  name: 'LoadingModal',
  components: {
    'v-loading': VLoading
  },
  data: function() {
    return {

    }
  }
}
</script>

<style>
  /* 定义模态对话框外面的覆盖层样式 */
  #modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width:100%;
    height:100%;
    text-align:center;
    z-index: 9999999;
    overflow: auto;
    background-color: rgba(0,0,0,.4);
  }
  /* 模态框样式 */
  .modal-data{
    width: 200px;
    margin: 200px auto;
    background-color: #fff;
    border:0 solid #000;
    padding:15px;
    text-align:center;
    border-radius:25px;
    position: relative;
  }
</style>
