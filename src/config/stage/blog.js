const blogRouter = {
  route: null,
  name: null,
  title: '文章管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/blog/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '文章列表',
      type: 'view',
      name: 'blogList',
      route: '/blog/list',
      filePath: 'views/blog/BlogList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加文章',
      type: 'view',
      name: 'blogAdd',
      route: '/blog/add',
      filePath: 'views/blog/BlogAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
      right: ['超级管理员独有权限'],
    },
  ],
}

export default blogRouter
