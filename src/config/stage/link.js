const linkRouter = {
  route: null,
  name: null,
  title: '链接管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'el-icon-link',
  filePath: 'views/link/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '链接列表',
      type: 'view',
      name: 'linkList',
      route: '/link/list',
      filePath: 'views/link/LinkList.vue',
      inNav: true,
      icon: 'el-icon-link',
    },
    {
      title: '新建链接',
      type: 'view',
      name: 'linkAdd',
      route: '/link/add',
      filePath: 'views/link/LinkAdd.vue',
      inNav: true,
      icon: 'el-icon-link',
      right: ['超级管理员独有权限'],
    },
  ],
}

export default linkRouter
