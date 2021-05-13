<template>
  <global-footer class="footer custom-render">
    <template v-slot:links />
    <template v-slot:copyright />
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
