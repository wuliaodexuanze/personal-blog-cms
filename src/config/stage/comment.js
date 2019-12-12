const commentRouter = {
  route: null,
  name: null,
  title: '评论管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-pinglun',
  filePath: 'views/comment/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '评论列表',
      type: 'view',
      name: 'commentList',
      route: '/comment/list',
      filePath: 'views/comment/CommentList.vue',
      inNav: true,
      icon: 'iconfont icon-pinglun',
    },
  ],
}

export default commentRouter
