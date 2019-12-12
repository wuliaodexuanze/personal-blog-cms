const favorRouter = {
  route: null,
  name: null,
  title: '收藏管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-shoucang',
  filePath: 'views/favor/', // 文件路径
  order: null,
  inNav: true,
  children: [{
    title: '收藏列表',
    type: 'view',
    name: 'favorList',
    route: '/favor/list',
    filePath: 'views/favor/FavorList.vue',
    inNav: true,
    icon: 'iconfont icon-shoucang',
    right: ['获取收藏列表'],  //这里配置的名字要和后台中请求时auth的名字一样才有效
  },
  ],
}

export default favorRouter
