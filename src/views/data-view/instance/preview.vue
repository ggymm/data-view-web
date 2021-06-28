<template>
  <div>预览</div>
</template>

<script>
export default {
  name: 'Preview',
  created() {
    const instanceId = this.$route.params.instance_id
    if (instanceId) {
      this.getDataView(instanceId)
    }
  },
  methods: {
    getDataView(instanceId) {

    }
  }
}
</script>
