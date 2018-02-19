// const isOnline = tool.env.isOnline()
const isOnline = false

const list = {
  path: '/list',
  meta: '项目路由',
  component: () =>
    import(/* webpackChunkName: "./pages/list" */ '../pages/list')
}

const test = {
  path: '/test',
  meta: '测试',
  component: () =>
      import(/* webpackChunkName: "./pages/test" */ '../pages/test')
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

// 线上不显示的路由
if (!isOnline) {
  other.unshift(list, test)
}

export default other
