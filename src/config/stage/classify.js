const classifyRouter = {
  route: null,
  name: null,
  title: '分类管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'el-icon-cold-drink',
  filePath: 'views/classify/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '分类列表',
      type: 'view',
      name: 'classifyList',
      route: '/classify/list',
      filePath: 'views/classify/ClassifyList.vue',
      inNav: true,
      icon: 'el-icon-cold-drink',
    },
    {
      title: '添加分类',
      type: 'view',
      name: 'classifyAdd',
      route: '/classify/add',
      filePath: 'views/classify/ClassifyAdd.vue',
      inNav: true,
      icon: 'el-icon-cold-drink',
      right: ['超级管理员独有权限'],
    },
  ],
}

export default classifyRouter
