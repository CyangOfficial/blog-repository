import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/music',
  name: 'Music',
  component: LAYOUT,
  redirect: '/music/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.demo.music.music'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'MusicPage',
      component: () => import('../../../views/music/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
