// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './service'
import validate from './service/validate'
import * as regexp from './service/regexp'

import './assets/scss/layout.scss'

validate.setConfig({
  // handleError (err) {
  //   window.layer.tip(err)
  // },
  rules: regexp
})
Vue.use(validate)

Vue.config.productionTip = false

router.afterEach((to, from) => {
  window.title(to.meta)
  window.scrollTo(0, 0)
  window.layer.closeAll()
})

Vue.config.errorHandler = (err, vm, info) => {
  if (err) {
    // postError('vue-render', err, { info })
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
