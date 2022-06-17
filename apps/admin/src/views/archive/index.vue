<template>
  <div class="wrap">
    <p>archive page</p>
    <input type="text">
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'Archive',
  setup () {
    onMounted(() => {
      console.log('onMounted')
    })
  }
}
</script>
<style lang='scss' scoped>
</style>
