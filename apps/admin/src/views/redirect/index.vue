<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'Redirect',
  created () {
    const { params, query } = useRoute()
    const { path } = params
    const router = useRouter()
    console.log(params, query)
    router.replace({ path: '/' + path, query }).catch(err => {
      console.log(err)
    })
  },
  // eslint-disable-next-line vue/require-render-return
  render () { }
}
</script>
<style lang='scss' scoped>
</style>
