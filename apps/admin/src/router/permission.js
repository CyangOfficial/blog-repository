import router, { routes } from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  await store.dispatch('permission/generateRoutes', routes)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
