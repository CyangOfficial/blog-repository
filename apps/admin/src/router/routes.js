export const routes = [
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/layout'),
    redirect: '/article/list',
    meta: { title: '文章', icon: 'post' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'post_list' }
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/article/edit'),
        meta: { title: '新建文章', icon: 'create_post' }
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/article/edit'),
        meta: { title: '文章编辑', icon: 'create_post', hidden: true }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/article/category'),
        meta: { title: '文章分类', icon: 'category' }
      }
    ]
  },
  {
    path: '/archive',
    component: () => import('@/views/layout'),
    children: [{
      path: 'index',
      name: 'Archive',
      meta: { title: '归档', icon: 'archive' },
      component: () => import('@/views/archive')
    }]
  }
]
