const routes = [
  {
    id: '0',
    name: 'index',
    route: '/',
    hide: true, // 不显示 重定向到 /dashboard
  },
  {
    id: 'graphanalyse',
    name: '增长分析',
    route: '/graphanalyse',
  },
]

/**
 * 依据 pathname 获取页面的标题
 * @param pathname
 * @returns {string}
 */
export function getPageTitle(pathname) {
  let title = ''
  routes.forEach(v => {
    if (v.route === pathname) {
      title = v.name
    }
  })

  return title
}

export default routes
