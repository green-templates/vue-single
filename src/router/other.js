const list = {
  path: '/list',
  meta: '项目路由',
  component: () => import(/* webpackChunkName: "./pages/list" */ '../pages/list')
}

const other = [
  // {
  //   path: '/',
  //   redirect: '/list'
  // },
  // {
  //   path: '*',
  //   redirect: '/list'
  // }
]

other.unshift(list)

export default other
