const tagRouter = {
  route: null,
  name: null,
  title: '标签管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'el-icon-price-tag',
  filePath: 'views/tag/', // 文件路径
  order: null,
  inNav: true,
  children: [{
    title: '标签列表',
    type: 'view',
    name: 'tagList',
    route: '/tag/list',
    filePath: 'views/tag/TagList.vue',
    inNav: true,
    icon: 'el-icon-price-tag',
  },
  {
    title: '添加标签',
    type: 'view',
    name: 'tagAdd',
    route: '/tag/add',
    filePath: 'views/tag/TagAdd.vue',
    inNav: true,
    icon: 'el-icon-price-tag',
    right: ['超级管理员独有权限'],
  }],
}

export default tagRouter
