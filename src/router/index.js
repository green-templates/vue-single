import Vue from 'vue'
import Router from 'vue-router'

import other from './other'

Vue.use(Router)

const routes = [
  ...other
]

export default new Router({
  routes
})

// 用于 list 展示
export const routeData = [{
  title: '其他',
  routes: other
}]
