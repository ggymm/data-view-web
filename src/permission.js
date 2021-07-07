import router from '@/router'

import NProgress from '@/components/NProgress/index'
import '@/components/NProgress/index.less'

NProgress.configure({ showSpinner: true })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
