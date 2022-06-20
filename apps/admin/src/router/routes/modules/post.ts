import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/post',
  name: 'Post',
  component: LAYOUT,
  redirect: '/post/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:file-document-edit-outline',
    title: t('routes.demo.post.menu'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'PostPage',
      component: () => import('../../../views/post/index.vue'),
      meta: {
        title: t('routes.demo.post.list'),
        icon: 'mdi:file-document-edit-outline',
        hideMenu: false,
      },
    },
    {
      path: 'create',
      name: 'CreatePost',
      component: () => import('../../../views/post/edit/index.vue'),
      meta: {
        title: t('routes.demo.post.create'),
        hideMenu: true,
      },
    },
    {
      path: ':id',
      name: 'PostEdit',
      component: () => import('../../../views/post/edit/index.vue'),
      meta: {
        title: t('routes.demo.post.edit'),
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
