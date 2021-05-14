<template>
  <div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>

export default {
  name: 'BlankLayout',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>

</style>
